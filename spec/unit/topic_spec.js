const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;


describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;

    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Cake Decoration",
        description: "Various methods to decorate cakes"
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Bundt Molds",
          body: "Using molds to shape cakes and frost",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {

    it("should create a topic with the title and description", (done) => {
      Topic.create({
        title: "Home Renovation Ideas",
        description: "Various ways to inspire home remodeling"
      })
      .then((topic) => {
        expect(topic.title).toBe("Home Renovation Ideas");
        expect(topic.description).toBe("Various ways to inspire home remodeling");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#getPosts()", () => {

    it("should return the associated post", (done) => {
      this.topic.getPosts()
      .then((posts) => {
        expect(posts[0].title).toBe("Bundt Molds");
        done();
      })
    })
  })



});
