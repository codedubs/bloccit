
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/flairs/";
const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;



describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Raid bosses",
        description: "Which ones are hardest to attack"
      })
      .then((topic) => {
        this.topic = topic;

        Flair.create({
          name: "Flair 1",
          color: "red"
        })
        .then((flair) => {
          this.flair = flair;
          Post.create({
            title: "Solo fight",
            body: "I was able to take down level 3 on my own",
            topicId: this.topic.id,
            flairId: this.flair.id
          })
          .then((post) => {
            this.post = post;
            done();
          })
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /flairs", () => {

    it("should return a status code 200 and all flairs", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Flairs");
        expect(body).toContain("Flair 1");
        done();
      });
    });
  });

  describe("GET /flairs/new", () => {

    it("should render a new flair form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });
  });

  describe("POST /flairs/create", () => {
    const options = {
      url: `{base}create`,
      form: {
        name: "Flair 2",
        color: "blue"
      }
    };

    it("should create a new flair and redirect", (done) => {
      request.post(options, (err, res, body) => {
        Flair.findOne({where: {name: "Flair 2"}})
        .then((flair) => {
          expect(res.statusCode).toBe(303);
          expect(flair.name).toBe("Flair 2");
          expect(flair.color).toBe("blue");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /flairs/:id", () => {

    it("should render a view with the selected flair", (done) => {
      request.get(`${base}${this.flair.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Flair 1");
        done();
      });
    });
  });

  describe("POST /flairs/:id/destroy", () => {

    it("should delete the flair with the associated ID", (done) => {
      Flair.all()
      .then((flairs) => {
        const flairCountBeforeDelete = flairs.length;
        expect(flairCountBeforeDelete).toBe(1);
        request.post(`${base}${this.flair.id}/destroy`, (err, res, body) => {
          Flair.all()
          .then((flairs) => {
            expect(err).toBeNull();
            expect(flairs.length).toBe(flairCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("GET /flairs/:id/edit", () => {

    it("should render a view with an edit flair form", (done) => {
      request.get(`${base}${this.flair.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Flair");
        expect(body).toContain("Flair 1");
        done();
      });
    });
  });

  describe("POST /flairs/:id/update", () => {

    it("should update the flair list with the given values", (done) => {
      const options = {
        url: `${base}${this.flair.id}/update`,
        form: {
          name: "Flair 1",
          color: "red"
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Flair.findOne({
          where: {id: this.flair.id}
        })
        .then((flair) => {
          expect(flair.name).toBe("Flair 1");
          done();
        });
      });
    });
  });


})
