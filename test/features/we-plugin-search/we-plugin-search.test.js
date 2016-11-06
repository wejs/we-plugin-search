const assert = require('assert'),
      request = require('supertest'),
      helpers = require('we-test-tools').helpers;

let http, we, agent;

describe('we-plugin-search', function() {
  let post;

  // get we.js app and required
  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);

    we = helpers.getWe();
    done();
  });

  // preload one post
  before(function (done) {
    we.db.models.post.findOne()
    .then( (p)=> {
      post = p;

      done();
    })
    .catch(done);
  });

  it ('should return all posts in /post ', function(done) {
    request(http)
    .get('/post')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        console.error('res.text>',res.text)
        throw err
      }

      assert.equal(res.body.meta.count, 6);

      done();
    });
  });

  describe('equal', function() {
    it ('should return one post with title Fallout (series)', function(done) {
      const title = 'Fallout (series)';

      request(http)
      .get(`/post?title=${title}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text)
          throw err
        }

        assert.equal(res.body.meta.count, 1, 'should return one record');
        assert.equal(res.body.post[0].title, title, `title should be ${title}`);

        done();
      });
    });

    it ('should return one post with title Fallout 4 (2015)', function(done) {
      const title = 'Fallout 4 (2015)';

      request(http)
      .get(`/post?title=${title}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text)
          throw err
        }

        assert.equal(res.body.meta.count, 1, 'should return one record');
        assert.equal(res.body.post[0].title, title, `title should be ${title}`);

        done();
      });
    });

    it ('title_equal should return one post with title Fallout: New Vegas (2010)', function(done) {
      const title = 'Fallout: New Vegas (2010)';

      request(http)
      .get(`/post?title_equal=${title}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text)
          throw err
        }

        assert.equal(res.body.meta.count, 1, 'should return one record');
        assert.equal(res.body.post[0].title, title, `title should be ${title}`);

        done();
      });
    });

    it ('id_equal should return one post with id=', function(done) {
      request(http)
      .get(`/post?id_equal=${post.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text)
          throw err
        }

        assert.equal(res.body.meta.count, 1, 'should return one record');
        assert.equal(res.body.post[0].id, post.id, `id should be ${post.id}`);
        assert.equal(res.body.post[0].title, post.title, `title should be ${post.title}`);

        done();
      });
    });

    it ('published_equal=true should return posts published', function(done) {

      request(http)
      .get(`/post?published_equal=true`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 4, 'should return 4 records');

        res.body.post.forEach( (p)=> {
          assert.equal(p.published, true, `published should be true`);
        })

        done();
      });
    });

    it ('published_equal=false should return posts unPublished', function(done) {

      request(http)
      .get(`/post?published_equal=false`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err
        }

        assert.equal(res.body.meta.count, 2, 'should return 2 records');

        res.body.post.forEach( (p)=> {
          assert.equal(p.published, false, `published should be false`);
        });

        done();
      });
    });
  });

  describe('is-null', function() {
    it ('category_is-null should return 2 posts', function(done) {

      request(http)
      .get(`/post?category_is-null=true`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text)
          throw err
        }

        assert.equal(res.body.meta.count, 2, 'should return 2 records');

        res.body.post.forEach( (p)=> {
          assert.equal(p.category, null, `category should be null`);
        });

        done();
      });
    });
  });

  describe('not-is-null', function( ){
    it ('category_not-is-null should return 4 posts', function(done) {

      request(http)
      .get(`/post?category_not-is-null=true`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text)
          throw err
        }

        assert.equal(res.body.meta.count, 4, 'should return 4 records');

        res.body.post.forEach( (p)=> {
          assert(p.category, `category is not null`);
        });

        done();
      });
    });
  });

  describe('starts-with', function() {
    it ('body_starts-with=Released in 1997 should return posts', function(done) {

      const text = 'Released in 1997';

      request(http)
      .get(`/post?body_starts-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 1, 'should return 1 record');

        res.body.post.forEach( (p)=> {
          assert(p.body.indexOf(text) === 0, `body should start with ${text}`);
        });

        done();
      });
    });

    it ('body_starts-with=Fallout should return posts', function(done) {

      const text = 'Fallout';

      request(http)
      .get(`/post?body_starts-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 5, 'should return 5 records');

        res.body.post.forEach( (p)=> {
          assert(p.body.indexOf(text) === 0, `body should start with ${text}`);
        });

        done();
      });
    });
  });

  describe('not-starts-with', function() {
    it ('body_not-starts-with=Released in 1997 should return posts', function(done) {

      const text = 'Released in 1997';

      request(http)
      .get(`/post?body_not-starts-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 5, 'should return 5 records');

        res.body.post.forEach( (p)=> {
          assert(p.body.indexOf(text) !== 0, `body should not start with ${text}`);
        });

        done();
      });
    });

    it ('body_not-starts-with=Fallout should return posts', function(done) {

      const text = 'Fallout';

      request(http)
      .get(`/post?body_not-starts-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 1, 'should return 1 records');

        res.body.post.forEach( (p)=> {
          assert(p.body.indexOf(text) !== 0, `body should not start with ${text}`);
        });

        done();
      });
    });
  });

  describe('ends-with', function() {
    it ('body_ends-with=favor of Bethesda.[4] should return posts', function(done) {

      const text = 'favor of Bethesda.[4]';

      request(http)
      .get(`/post?body_ends-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 1, 'should return 1 record');

        res.body.post.forEach( (p)=> {
          const expectedLen =  p.body.length - text.length;

          assert(p.body.indexOf(text) === expectedLen, `body should end with ${text}`);
        });

        done();
      });
    });

    it ('body_ends-with=something. should return posts', function(done) {

      const text = 'something.';

      request(http)
      .get(`/post?body_ends-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 2, 'should return 2 records');

        res.body.post.forEach( (p)=> {
          const expectedLen =  p.body.length - text.length;
          assert(p.body.indexOf(text) === expectedLen, `body should end with ${text}`);
        });

        done();
      });
    });
  });

  describe('not-ends-with', function() {
    it ('body_not-ends-with=something. should return posts', function(done) {

      const text = 'something.';

      request(http)
      .get(`/post?body_not-ends-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 4, 'should return 4 records');

        res.body.post.forEach( (p)=> {
          const expectedLen =  p.body.length - text.length;
          assert(p.body.indexOf(text) !== expectedLen, `body should not end with ${text}`);
        });

        done();
      });
    });

    it ('body_not-ends-with=Playing Game. should return posts', function(done) {

      const text = 'Playing Game.';

      request(http)
      .get(`/post?body_not-ends-with=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 5, 'should return 5 records');

        res.body.post.forEach( (p)=> {
          const expectedLen =  p.body.length - text.length;
          assert(p.body.indexOf(text) !== expectedLen, `body should not end with ${text}`);
        });

        done();
      });
    });
  });

  describe('contains', function() {
    it ('body_contains=Fallout 4 should return posts', function(done) {

      const text = 'Fallout 4';

      request(http)
      .get(`/post?body_contains=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 2, 'should return 2 records');

        res.body.post.forEach( (p)=> {
          assert(p.body.indexOf(text) >-1, `body should contains ${text}`);
        });

        done();
      });
    });
  });

  describe('not-contains', function() {
    it ('body_not-contains=Fallout 4 should return posts', function(done) {

      const text = 'Fallout 4';

      request(http)
      .get(`/post?body_not-contains=${text}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 4, 'should return 4 records');

        res.body.post.forEach( (p)=> {
          assert(p.body.indexOf(text) == -1, `body should not contains ${text}`);
        });

        done();
      });
    });
  });

  describe('between', function() {
    it ('comments_between=9-11 should return posts', function(done) {

      request(http)
      .get(`/post?comments_between=9-11`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 2, 'should return 2 records');

        res.body.post.forEach( (p)=> {
          assert.equal(p.comments, 10, `comments should be between 9 and 11`);
        });

        done();
      });
    });

    it ('comments_between=1-6 should return posts', function(done) {

      request(http)
      .get(`/post?comments_between=1-6`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 1, 'should return 1 records');

        res.body.post.forEach( (p)=> {
          assert.equal(p.comments, 5, `comments should be between 1 and 6`);
        });

        done();
      });
    });
  });

  describe('not-between', function() {
    it ('comments_not-between=9-11 should return posts', function(done) {

      request(http)
      .get(`/post?comments_not-between=9-11`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 4, 'should return 4 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments != 10, `comments should not be between 9 and 11`);
        });

        done();
      });
    });

    it ('comments_not-between=1-6 should return posts', function(done) {

      request(http)
      .get(`/post?comments_not-between=1-6`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 5, 'should return 5 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments != 5, `comments should not be between 1 and 6`);
        });

        done();
      });
    });
  });

  describe('gt', function() {
    it ('comments_gt=10 should return posts', function(done) {

      request(http)
      .get(`/post?comments_gt=10`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 1, 'should return 1 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments > 10, `comments should be greater than 9`);
        });

        done();
      });
    });

    it ('comments_gt=5 should return posts', function(done) {

      request(http)
      .get(`/post?comments_gt=5`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 3, 'should return 3 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments > 5, `comments should be greater than 5`);
        });

        done();
      });
    });
  });

  describe('gte', function() {
    it ('comments_gte=10 should return posts', function(done) {

      request(http)
      .get(`/post?comments_gte=10`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 3, 'should return 3 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments >= 10, `comments should be greater  or equal than 10`);
        });

        done();
      });
    });

    it ('comments_gte=5 should return posts', function(done) {

      request(http)
      .get(`/post?comments_gte=5`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 4, 'should return 4 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments >= 5, `comments should be greater or equal than 5`);
        });

        done();
      });
    });
  });

  describe('lt', function() {
    it ('comments_lt=10 should return posts', function(done) {

      request(http)
      .get(`/post?comments_lt=10`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 3, 'should return 3 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments < 10, `comments should be less than 10`);
        });

        done();
      });
    });

    it ('comments_lt=5 should return posts', function(done) {

      request(http)
      .get(`/post?comments_lt=5`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 2, 'should return 32 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments < 5, `comments should be less than 5`);
        });

        done();
      });
    });
  });

  describe('lte', function() {
    it ('comments_lte=10 should return posts', function(done) {

      request(http)
      .get(`/post?comments_lte=10`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 5, 'should return 5 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments <= 10, `comments should be less or equal than 10`);
        });

        done();
      });
    });

    it ('comments_lte=5 should return posts', function(done) {

      request(http)
      .get(`/post?comments_lte=5`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 3, 'should return 3 records');

        res.body.post.forEach( (p)=> {
          assert(p.comments <= 5, `comments should be less or equal than 5`);
        });

        done();
      });
    });
  });

  describe('DATE', function() {
    let now;

    before(function(done) {
      post.createdAt = '2014-11-06T18:07:36.028Z';
      post.save()
      .nodeify(done);
    });

    before(function(done) {
      now = '2015-12-06T18:07:36.028Z';
      // update 2 posts to now
      we.db.models.post.update({
        createdAt: now
      }, {
        where: { id: { $gt: post.id }},
        limit: 2
      })
      .nodeify(done);
    });

    it ('createdAt_gt=now should return posts', function(done) {

      request(http)
      .get(`/post?createdAt_gt=${now}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        assert.equal(res.body.meta.count, 4, 'should return 4 records');

        res.body.post.forEach( (p)=> {
          assert(p.createdAt > now, `createdAt should be greater than ${now}`);
        });

        done();
      });
    });


    it ('createdAt_lt=now should return posts', function(done) {

      request(http)
      .get(`/post?createdAt_lt=${now}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('res.text>',res.text);
          throw err;
        }

        res.body.post.forEach( (p)=> {
          assert(p.createdAt < now, `createdAt should be less than ${now}`);
        });

        done();
      });
    });
  });
});