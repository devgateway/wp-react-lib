import {createMedia} from "@artsy/fresnel";

const AppMedia = createMedia({
    breakpoints: {
        mobile: 320,
        tablet: 768,
        computer: 992,
        largeScreen: 1200,
        widescreen: 1920
    }
});


// Generate CSS to be injected into the head
export const mediaStyle = AppMedia.createMediaStyle()
export const {Media, MediaContextProvider} = AppMedia
