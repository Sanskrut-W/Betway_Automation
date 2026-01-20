import fs from 'fs';
import path from 'path';
const projectRoot = path.resolve(__dirname, '../../..');
const AllBookingCodesPath = path.resolve(projectRoot, 'regions/ZA/json-data/AllBookingCodes.json');

export async function storeAllBookingCode(BetInfluencerPage: import('../pages/BetInfluencerModal').BetInfluencerModal) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const now = new Date();
    const currentMonth = monthNames[now.getMonth()];
    const currentYear = now.getFullYear();

    const apiPartial = `/BookingCode/${currentMonth}/${currentYear}`
    console.log("Watching API containing:", apiPartial);
    let allPagesData = [];
    let currentPage = 1;
    let hasNext = true;
    await BetInfluencerPage.gotoDetailSectionBetInfluencerModal();
    while (hasNext) {
        const apiResponsePromise = BetInfluencerPage.page.waitForResponse(response =>
            response.url().includes(apiPartial) &&
            response.url().includes(`page=${currentPage}`) &&
            response.status() === 200
        );
        if (currentPage == 1) {
            await BetInfluencerPage.BetInfluencerModalLocatorRegistry.summaryButton.click();
            await BetInfluencerPage.clickDetailButton();
        }

        const apiResponse = await apiResponsePromise;
        const data = await apiResponse.json();

        allPagesData.push(data);
        hasNext = data.hasNextPage;
        if (hasNext) {
            currentPage++;
            await BetInfluencerPage.page.getByText('next').click();
        }
    }
    const output = {
        totalPages: allPagesData.length,
        pages: allPagesData
    };

    fs.writeFileSync(AllBookingCodesPath, JSON.stringify(output, null, 2));
}

export function getFirstBookingCode() {
    if (fs.existsSync(AllBookingCodesPath)) {
        const rawData = fs.readFileSync(AllBookingCodesPath, "utf-8");
        const bookingData = JSON.parse(rawData);

        if (
            bookingData.pages &&
            bookingData.pages.length > 0 &&
            bookingData.pages[0].result &&
            bookingData.pages[0].result.length > 0
        ) {
            return bookingData.pages[0].result[0].bookingCode;
        }
    }
    throw new Error("No booking codes found in AllBookingCodes.json");
}

export function getLastBookingCode() {
    if (fs.existsSync(AllBookingCodesPath)) {
        const rawData = fs.readFileSync(AllBookingCodesPath, "utf-8");
        const bookingData = JSON.parse(rawData);

        if (bookingData.pages && bookingData.pages.length > 0) {
            const lastPage = bookingData.pages[bookingData.pages.length - 1];

            if (lastPage.result && lastPage.result.length > 0) {
                return lastPage.result[lastPage.result.length - 1].bookingCode;
            }
        }
    }
    throw new Error("No booking codes found in AllBookingCodes.json");
}
