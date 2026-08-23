export const IMAGE_API = "MY_APPS_SCRIPT_URL_IMAGES";

export async function fetchSiteImages(): Promise<any> {
  try {
    const response = await fetch(IMAGE_API);
    if (!response.ok) {
      return null;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    // Ignore fetch errors for the placeholder URL
    return null;
  }
}
