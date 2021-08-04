import * as PouchDB from 'pouchdb';
import { DbConfig } from '../config/db-config';

export default class DbService {
    private static local: PouchDB.Database<{}>;
    private static remote: PouchDB.Database<{}>;

    public static async connect(config: DbConfig): Promise<void> {
        console.log('Connecting to the database');
        DbService.local = new PouchDB(config.local);
        DbService.remote = new PouchDB(config.remote);

        DbService.local.replicate.from(DbService.remote, { live: true, retry: true })
        .on('complete', () => {
            console.log('database replication has been completed');
        })
        .on('error', (err) => {
            console.error('Error replicating db demo remote');
            console.error(err);
        })
        .on('change', (changes) => {
            console.log('Changes received');
            console.log(changes);
        })
        .on('paused', (info) => {
            console.log('Replication paused');
        });

        const doc = await DbService.local.get('0d472f51-5619-4c0b-9197-2f6f2f9cfb8a');
        console.log(doc);
    }

}