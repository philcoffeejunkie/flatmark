const express    = require('express');
const bodyParser = require('body-parser');
const fs         = require('fs');
const passport   = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = {
   'phil' : 'pass'
};

// ----- FUNCTIONS -------

// function containsDescription(bookmarkString) {
function containsDescription(bookmarkString) {
    if ((bookmarkString.indexOf('(') != -1) && (bookmarkString.indexOf(')') != -1)) {
        return true;
    }
    else {
        return false;
    }
}

function containsTags(bookmarkString) {
    if (bookmarkString.indexOf('#') != -1) {
        return true;
    }
    else {
        return false;
    }
}

function getBookmarkLink(bookmarkString) {
    spacePosition = bookmarkString.indexOf(' ');
    if (spacePosition != -1) {
        return bookmarkString.substring(0, spacePosition);
    }
    else {
        return bookmarkString;
    }
}

function getBookmarkDescription(bookmarkString) {
    var startPos = 0;
    var endPos = 0;
    startPos = bookmarkString.indexOf('(') + 1;
    endPos = bookmarkString.indexOf(')');
    return bookmarkString.substring(startPos, endPos);
}

function getBookmarkTags(bookmarkString) {
    var allTags = [];
    var startPos = 0;
    startPos = bookmarkString.indexOf('#');
    allTags = bookmarkString.substring(startPos, bookmarkString.length);
    return allTags.split(' ');
}

function readBookmarks(res) {
    fs.readFile('marks.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var bookmarks = [];
        var lines = data.split('\n');
        lines.forEach(function(line) {
            if (line.length > 0 ) {
                var bookmark = {};
                bookmark.url = getBookmarkLink(line);
                if (containsDescription(line)) {
                    bookmark.description = getBookmarkDescription(line);
                }
                if (containsTags(line)) {
                    bookmark.tags = getBookmarkTags(line);
                }
                bookmarks.push(bookmark);
            }
        });
        res.json(bookmarks);
    });
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (!users[username] || users[username] != password) {
      return done(null, false);
    }

    return done(null, { username : username });
  }
));


// ----- MAIN PROGRAM -----

const app = express();

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// Not needed anymore, "/" gets forwarded to static index.html under /frontend automatically
//
// router.get('/', function(req, res) {
    // res.json({ message: 'welcome to flatmark 0.1.0' });
    //res.sendFile('./frontend/index.html')
// })

router.route('/bookmarks')

    // create bookmark
    .post(function(req, res) {
        var bookmarkString = req.body.bookmarkString + '\n';
        fs.appendFile('marks.txt', bookmarkString, 'utf8', function (err) {
            if (err) return console.log(err);
        });
        res.json(bookmarkString);
    })

    // get all the bookmarks
    .get(function(req, res) {
        readBookmarks(res);
    })

router.route('/bookmarks/:bookmark_id')

    // update bookmark with this id
    .put(function(req, res) {
        // update line req.params.bookmark_id
        fs.readFile('marks.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var lines = data.split('\n');
        lines[req.params.bookmark_id] = req.body.bookmarkString;

        fs.writeFile('marks.txt', lines.join('\n'), 'utf8', function (err) {
            if (err) return console.log(err);
            res.json(req.body.bookmarkString);
        });
    });
    })

    // delete bookmark with this id
    .delete(function(req, res) {
        // del line req.params.bookmark_id
        fs.readFile('marks.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var lines = data.split('\n');
        lines.splice(req.params.bookmark_id, 1);

        fs.writeFile('marks.txt', lines.join('\n'), 'utf8', function (err) {
            if (err) return console.log(err);
            res.json(lines[req.params.bookmark_id]);
        });
    });
    })

app.use('/', router);
app.use(express.static('frontend'));
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, () => console.log('flatmark app listening on port 3000!'))
