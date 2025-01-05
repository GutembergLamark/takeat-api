import retry from "async-retry";
import "dotenv/config";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      minTimeout: 100,
      factor: 1.1,
      onRetry: (err: any, i) =>
        console.log(`Retrying ${i} of 100: ${err.message}`),
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch(
          `http://localhost:${process.env.NODE_PORT}/`,
        );
        if (response.status !== 200) {
          throw new Error(
            `Server is not ready. Response status: ${response.status}`,
          );
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }
  }
}

const orquestrator = {
  waitForAllServices,
};

export default orquestrator;
