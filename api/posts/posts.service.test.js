const PostsService = require('./posts.service'); 

/**
 * Note: for simplicity, these tests depend on the mock data used by the api (/api/data).
 */
describe('PostsService', () => {
    let postsService;

    beforeAll(async () => {
        postsService = new PostsService();
    });

    it('should retrieve a post by ID', () => {
        const postId = 1

        const post = postsService.getById(postId);

        expect(post).toHaveProperty('id', postId);
        expect(post).toEqual(expect.objectContaining({
            "id": 1,
            "title": "The Comeback of Retro Fashion",
            "created_at": "2023-03-15",
            "tags": ["Fashion", "Lifestyle", "Trends"]
        }));
    });

    it('should fail for not existing ID', () => {
        const postId = 20

        expect(()=>postsService.getById(postId)).toThrow(Error("Post not found"));
    });

    it('should retrieve the comments of a post by ID', () => {
        const postId = 1

        const comments = postsService.getCommentsById(postId);

        expect(comments.length).toEqual(2);
    });

    it('should find posts by tag', () => {
        const tag = "Lifestyle";

        const posts = postsService.findByTag(tag);

        expect(posts.length).toEqual(5);
        for(const post of posts){
            expect(post.tags).toContain(tag);
        }
    });
});