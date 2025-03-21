const request = require("supertest");
const express = require("express");
const PostsController = require("./posts.controller");

//Mock PostsService
const mockPostsService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getCommentsById: jest.fn(),
  findByTag: jest.fn(),
};

//Init PostsController with the mocked service
const postsController = new PostsController(mockPostsService);

//Define routes
const app = express();
app.get("/posts", postsController.getAll);
app.get("/posts/:id", postsController.getById);
app.get("/posts/:id/comments", postsController.getCommentsById);
app.get("/posts/tag/:name", postsController.findByTag);

describe("PostsController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all posts", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", tags: ["tag1", "tag2"] },
      { id: 2, title: "Post 2", tags: [] },
    ];
    mockPostsService.getAll.mockReturnValue(mockPosts);

    const response = await request(app).get("/posts");

    expect(mockPostsService.getAll).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockPosts });
  });

  it("should get post by ID", async () => {
    const postId = "1";
    const mockPost = { id: 1, title: "Post 1" };
    mockPostsService.getById.mockReturnValue(mockPost);

    const response = await request(app).get(`/posts/${postId}`);

    expect(mockPostsService.getById).toHaveBeenCalledWith(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockPost });
  });

  it("should return 400 for NaN", async () => {
    const postId = "string";
    const response = await request(app).get(`/posts/${postId}`);

    expect(mockPostsService.getById).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid post ID" });
  });

  it("should return 400 for decimal number", async () => {
    const postId = "2.2";
    const response = await request(app).get(`/posts/${postId}`);

    expect(mockPostsService.getById).not.toHaveBeenCalled(); 
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid post ID" });
  });

  it("should get comments by ID", async () => {
    const postId = "1";
    const mockComments = [{ id: 1, content: "Comment 1" }];
    mockPostsService.getCommentsById.mockReturnValue(mockComments);

    const response = await request(app).get(`/posts/${postId}/comments`);

    expect(mockPostsService.getCommentsById).toHaveBeenCalledWith(1);
    expect(response.status).toBe(200);
  });

  it("should return 400 for negative number", async () => {
    const postId = "-1";
    const mockComments = [{ id: 1, content: "Comment 1" }];
    mockPostsService.getCommentsById.mockReturnValue(mockComments);

    const response = await request(app).get(`/posts/${postId}/comments`);

    expect(mockPostsService.getCommentsById).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
  });

  it("should find posts by tag", async () => {
    const tagName = "tag1";
    const mockPosts = [
        { id: 1, title: "Post 1", tags: ["tag1", "tag2"] },
        { id: 2, title: "Post 2", tags: ['tag1'] },
    ];
    mockPostsService.findByTag.mockReturnValue(mockPosts);

    const response = await request(app).get(`/posts/tag/${tagName}`);

    expect(mockPostsService.findByTag).toHaveBeenCalledWith(tagName);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockPosts });
  });
});
