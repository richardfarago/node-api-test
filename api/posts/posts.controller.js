class PostsController {
  //Inject PostsService as a dependency
  constructor(postsService) {
    this.postsService = postsService; 
  }

  getAll = (req, res) => {
    try {
      console.log("Get posts");
      res.send({ data: this.postsService.getAll() });
    } catch(error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  };

  getById = (req, res) => {
    try {
      const postId = this.validateNumericInput(req.params.id);

      console.log("Get post by id", postId);
      res.send({ data: this.postsService.getById(postId) });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  };

  getCommentsById = (req, res) => {
    try {
      const postId = this.validateNumericInput(req.params.id);

      console.log("Get comments by post id", postId);
      res.send({ data: this.postsService.getCommentsById(postId) });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  };

  findByTag = (req, res) => {
    try {
      const tagName = req.params.name;

      console.log("Find posts by tag", tagName);
      res.send({ data: this.postsService.findByTag(tagName) });
    } catch(error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
    
  };

  validateNumericInput = (input) => {
    const number = Number(input); //Convert string to number

    if (Number.isNaN(number) || !Number.isInteger(number) || number < 0) {
      throw new Error("Invalid post ID");
    }

    return number;
  };
}

module.exports = PostsController;
