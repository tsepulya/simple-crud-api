const Application = require('./application');
const parseJson = require('./parse-json');
const userRouter = require('./user-router');

const PORT = process.env.PORT || 5000;

// const emitter = new EventEmitter();

const app = new Application();

// const router = new Router();


// router.get('/users', (req, res) => {
//     res.end('You send a request to USERS')
// })

// router.get('/posts', (req, res) => {
//     res.end('You send a request to POSTS')
// })

app.use(parseJson);
app.addRouter(userRouter);
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));


// const server = http.createServer((req, res) => {
//     const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res)
//     if (!emitted) {
//         res.end()
//     }
//     // if (req.url === '/users') {
//     //     return res.end('USERS');
//     // }
//     // res.end(req.url);
// });

// server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));


// node src/index.js