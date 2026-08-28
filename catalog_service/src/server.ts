import 'reflect-metadata';
import ExpressApp from './expressApp';

const PORT = process.env.port || 8000;

export const StartApp = async () => {
    ExpressApp.listen(PORT, () => {
        console.log(`App Listening the ${PORT}`);
    });

    process.on('uncaughtException', async (err) => {
        console.error(err);
        process.exit(1);
    });
};

StartApp().then(() => {
    console.log('server is up');
});