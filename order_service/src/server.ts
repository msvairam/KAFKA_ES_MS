import ExpressApp from './expressApp';

const PORT = process.env.port || 3000;

export const startServer = async () => {
    ExpressApp.listen(PORT, () => {
        console.log(`Server Start ${PORT} successfully`);
    });

    process.on('uncaughtException', (err) => {
        console.error(err);
        process.exit(1);
    });
}

startServer().then(() => {
    console.log('server up');
})