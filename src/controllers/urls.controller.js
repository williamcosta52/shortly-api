import { nanoid } from "nanoid";
import {
	verifyByToken,
	findUrlById,
	findShortUrl,
	updateViewsCount,
	insertUrl,
	deleteUrl,
} from "../repositories/urls.repositories.js";

export async function urlShort(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	const { url } = req.body;
	const shortUrl = nanoid();
	if (!token) return res.sendStatus(401);
	try {
		const verifyUser = await verifyByToken(token);
		if (verifyUser.rows.length === 0) return res.sendStatus(401);
		const user = verifyUser.rows[0];
		await insertUrl(url, shortUrl, user);
		res.status(201).send({ id: user.id, shortUrl: shortUrl });
	} catch (err) {
		res.send(err.message);
	}
}
export async function getUrlById(req, res) {
	const { id } = req.params;
	try {
		const findUrls = await findUrlById(id);
		if (findUrls.rows.length === 0)
			return res.status(404).send({ message: "url não existe" });
		const urls = findUrls.rows.map((u) => ({
			id: u.id,
			shortUrl: u.shortUrl,
			url: u.url,
		}));
		return res.status(200).send(urls[0]);
	} catch (err) {
		res.send(err.message);
	}
}
export async function getShortUrl(req, res) {
	const { shortUrl } = req.params;
	try {
		const resultShortUrl = await findShortUrl(shortUrl);
		if (resultShortUrl.rows.length === 0)
			return res.status(404).send({ message: "url não encontrada" });
		const url = resultShortUrl.rows[0].url;
		await updateViewsCount(resultShortUrl.rows[0].id);
		res.redirect(url);
	} catch (err) {
		res.send(err.message);
	}
}
export async function deleteUrlById(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	const { id } = req.params;
	if (!token) return res.sendStatus(401);
	try {
		const verifyUrl = await findUrlById(id);
		if (verifyUrl.rows.length === 0) return res.sendStatus(404);
		const verifyUser = await verifyByToken(token);
		if (verifyUser.rows.length === 0) return res.sendStatus(401);
		if (verifyUser.rows[0].id !== verifyUrl.rows[0].userId)
			return res.sendStatus(401);
		await deleteUrl(id);
		res.status(204).send({ message: "url excluida com sucesso!" });
	} catch (err) {
		res.send(err.message);
	}
}
