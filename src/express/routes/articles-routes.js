'use strict';

const {Router} = require(`express`);

const {getAPI} = require(`../api`);

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

articlesRouter.get(`/add`, (req, res) => {
  res.render(`new-post`);
});

articlesRouter.post(`/add`, async (req, res) => {
  const {body} = req;

  const articleData = {
    createdDate: body.date,
    title: body.title,
    announce: body.announcement,
    fullText: body[`full-text`],
  };

  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);

  res.render(`new-post`, {article, editMode: true});
});

articlesRouter.post(`/edit/:id`, async (req, res) => {
  const {body} = req;
  const articleData = {
    createdDate: body.date,
    title: body.title,
    announce: body.announcement,
    fullText: body[`full-text`],
  };
  const {id} = req.params;

  try {
    await api.updateArticle(articleData, id);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);

  res.render(`post`, {article});
});

module.exports = articlesRouter;
