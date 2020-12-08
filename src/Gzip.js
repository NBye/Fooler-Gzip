const zlib = require("zlib");
module.exports = async function ({ ctx }) {
    ctx.send = function ({ text, status = 200, headers = {} }) {
        headers['content-encoding'] = 'gzip';
        ctx.res.writeHead(status, headers);
        ctx.completed = true;
        let output = zlib.createGzip();
        output.pipe(ctx.res);
        output.write(text, () => {
            output.end();
        });
    }
}