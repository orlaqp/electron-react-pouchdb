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
        this.contentLocal = new PouchDB(this.config.contentLocal);
        this.contentRemote = new PouchDB(this.config.contentRemote);
        this.ordersLocal = new PouchDB(this.config.ordersLocal);
        this.ordersRemote = new PouchDB(this.config.ordersRemote);
        
        // setup indexes
        // this.contentLocal.createIndex({
        //     index: {fields: ['type']}
        // });
        // setup replication
        this.contentLocal.replicate.from(this.contentRemote, { live: true, retry: true })
        this.ordersLocal.replicate.to(this.ordersRemote, { live: true, retry: true })

        this.subscribeToDbEvents(this.contentLocal);
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