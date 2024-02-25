export const isDesctioViewport = (page) => {
    const size = page.viewportSize();
    return size.width >= 600;
}