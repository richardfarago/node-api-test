class PostsController {
  constructor(postsService) {
    this.postsService = postsService;
  }

  getAll = (req, res) => {
    console.log("Get posts");
    res.send({ data: this.postsService.getAll() });
  };

  getById = (req, res) => {
    try {
      const postId = this.validateNumber(req.params.id); //Convert to number

      console.log("Get post by id", postId);
      res.send({ data: this.postsService.getById(postId) });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  };

  getCommentsById = (req, res) => {
    try {
      const postId = this.validateNumber(req.params.id); //Convert to number

      console.log("Get comments by post id", postId);
      res.send({ data: this.postsService.getCommentsById(postId) });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  };

  findByTag = (req, res) => {
    const tagName = req.params.name;

    console.log("Find posts by tag", tagName);
    res.send({ data: this.postsService.findByTag(tagName) });
  };

  validateNumber = (input) => {
    const number = Number(input); //Convert to number

    if (Number.isNaN(number) || !Number.isInteger(number) || number < 0) {
      throw new Error("Invalid post ID");
    }

    return number;
  };
}

module.exports = PostsController;
