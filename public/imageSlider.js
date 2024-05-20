function bounceOut(time, begin, change, duration) {
    if ((time /= duration) < 1 / 2.75) {
        return change * (7.5625 * time * time) + begin;
    } else if (time < 2 / 2.75) {
        return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
    } else if (time < 2.5 / 2.75) {
        return (
            change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin
        );
    } else {
        return (
            change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin
        );
    }
}
simpleslider.getSlider({
    container: document.getElementById("myslider"),
    delay: 2,
    duration: 1,
    ease: bounceOut,
});