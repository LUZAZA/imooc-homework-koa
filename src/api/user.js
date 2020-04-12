const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const app = new Koa();
const router = new Router();

router.post("/api/user", async (ctx) => {
  let { body } = ctx.request;
  console.log(ctx.request)
  let hearder = ctx.request.header;
  let code = 200;
  let msg = "正常请求"
  let isAddBody = true;
  if (!body.name || body.name == "" || !body.email || body.email == "") {
    code = 404
    msg = "name与email不得为空"
    isAddBody = false
  } else if (!hearder.role || hearder.role != "admin") {
    code = 401
    msg = "unauthorized post"
    isAddBody = false
  }
  let data = {
    "code": code,
    "msg": msg
  }
  if (isAddBody) {
    data.body = { ...body }
  }
  //返回给用户的数据
  ctx.body = { ...data }
})

app.use(koaBody())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)