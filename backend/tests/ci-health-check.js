
const url = "http://127.0.0.1:5001/api/health";

async function main() {
    for (let attempt = 1; attempt <= 60; attempt++) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                const body = await response.json();

                if (body.success && body.database === "connected") {
                    console.log("Backend health check passed.");
                    return;
                }
            }
        } catch (error) {
            // The backend may still be starting.
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.error("Backend did not become healthy within 60 seconds.");
    process.exitCode = 1;
}

main().catch(error => {
    console.error("Health-check error:", error);
    process.exitCode = 1;
});
