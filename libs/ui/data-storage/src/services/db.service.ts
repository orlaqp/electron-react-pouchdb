import PouchDB from 'pouchdb';
import { DbConfig } from '../interfaces';
import { Product } from '../models/product';

PouchDB.plugin(require('pouchdb-find'));

class DbService {
    private contentLocal: PouchDB.Database<{}>;
    private contentRemote: PouchDB.Database<{}>;
    private ordersLocal: PouchDB.Database<{}>;
    private ordersRemote: PouchDB.Database<{}>;

    constructor(private config: DbConfig) {
        // .on('change', function (change) {
            //     console.log('CHANGES');
            //   }).on('paused', function (info) {
                //     console.log('PAUSED');
                //   }).on('active', function (info) {
                    //     console.log('ACTIVE');
                    //   }).on('error', function (err) {
                        //     console.log('ERROR');
                        //   });
                        
        this.contentLocal = new PouchDB(this.config.contentLocal)
        this.contentRemote = new PouchDB(this.config.contentRemote);
        this.ordersLocal = new PouchDB(this.config.ordersLocal);
        this.ordersRemote = new PouchDB(this.config.ordersRemote);

        try {
            this.ordersLocal.replicate.to(this.ordersRemote, { live: true, retry: true });
        } catch (error) {
            console.error('Error replicating orders database');
        }
    }

    processContentReplication(): Promise<PouchDB.Replication.ReplicationResultComplete<{}>> {
        return new Promise((resolve, reject) => {
            try {
                this.contentLocal.replicate.from(this.contentRemote)
                    .on('complete', (info) => {
                        this.contentLocal.replicate.from(this.contentRemote, { live: true, retry: true })
                            .on('change', (info) => this.onChanges(info));
                        resolve(info);
                    });
            } catch (error) {
                // For now just print the error
                console.error('Error syncronizing content database');
                console.error(error);
                reject(error);
            }
        });
    }
    onChanges(info: PouchDB.Replication.ReplicationResult<{}>): any {
        alert('new content changes have been received');
    }

    private subscribeToDbEvents(dbInstance: PouchDB.Database<{}>): void {
        dbInstance.on('complete', () => {
            console.log('database replication has been completed');
        })
        .on('error', (err: Error) => {
            console.error('Error replicating db demo remote');
            console.error(err);
        })
        .on('change', (changes: unknown) => {
            console.log('Changes received');
            console.log(changes);
        })
        .on('paused', (info: unknown) => {
            console.log('Replication paused');
        });
    }

    async getProducts(): Promise<Product[]> {
        const allProdsResponse = await this.contentLocal.allDocs<Product>({ include_docs: true });
        return allProdsResponse.rows.map(i => ({
            _id: i.doc!._id,
            _rev: i.doc!._rev,
            name: i.doc!.name,
            description: i.doc!.description
        }));
    }
}

let instance: DbService;

export const initializeDataStorage = (config: DbConfig) => {
    if (!instance) {
        instance = new DbService(config);
    }

    return instance;
}

export const getDataStorageInstance = () => {
    if (!instance) {
        throw new Error("Data store needs to be initialized first by calling 'initializeDataStorage' method");
    }

    return instance;
}