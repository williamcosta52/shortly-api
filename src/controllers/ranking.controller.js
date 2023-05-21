import { getCounts } from "../repositories/ranking.repositories.js";

export async function getRanking(req, res){
    try {
        const rankingCount = await getCounts();
        const ranking = rankingCount.rows.map((r) => (
            {
                id: r.id,
                name: r.name,
                linksCount: r.linksCount,
                visitCount: r.visitCount
            }
        ));
            res.send(ranking);
    } catch (err){
        res.send(err.message);
    }
}