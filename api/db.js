import { MongoClient } from "mongodb";

const uri = "mongodb+srv://root:Anuga123@cluster1.kbczbnj.mongodb.net/?appName=Cluster1";
const client = new MongoClient(uri);

export default async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db("vcf_saver");
}
