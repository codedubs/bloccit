const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

        Topic.create({
          title: "Cake Decoration",
          description: "Various methods to decorate cakes",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
          }, {
            include: {
              model: Post,
              as: "posts"
            }
          })
          .then((topic) => {
            this.topic = topic;
            this.post = topic.posts[0];
            done();
          });
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
        expect(posts[0].title).toBe("My first visit to Proxima Centauri b");
        done();
      })
    })
  })



});
