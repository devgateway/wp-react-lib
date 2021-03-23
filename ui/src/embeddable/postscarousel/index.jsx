import PostProvider from "../../wp/providers/PostProvider";
import PostConsumer from "../../wp/consumers/PostConsumer";
//import Carousel from "../../wp/components/carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';
import React from "react";
import {Container} from "semantic-ui-react";
import {CarouselProvider, DotGroup, Slide, Slider} from "pure-react-carousel";
import TheIntro from "../../wp/template-parts/TheIntro";
import './carousel.scss'

const Carousel = (props) => {
    let i = 0
    const {posts} = props
    return (<CarouselProvider

        totalSlides={posts.length}>
        <Slider>
            {posts.map(p => <Slide index={i++}>
                <TheIntro post={p} fluid/>
            </Slide>)}
        </Slider>
        <DotGroup/>
    </CarouselProvider>)


}


const _Carousel = (props) => {
    let i = 0
    const {posts} = this.props
    return <Container fluid={true} className={"carousel"}>
        <CarouselProvider totalSlides={posts.length}>
            <Slider>
                {posts.map(p => <Slide index={i++}>
                    <TheIntro post={p}/>
                </Slide>)}
            </Slider>
            <DotGroup/>
        </CarouselProvider>
    </Container>

}
const PostCarousel = (props) => {
    const {
        "data-type":type,
        "data-taxonomy":taxonomy,
        "data-categories":categories,
        "data-items":items
    } = props
    return <Container fluid={true}>
        <PostProvider type={type} taxonomy={taxonomy} categories={categories} store={"carousel"} page={1}
                      perPage={items}>
            <PostConsumer>
                <Carousel></Carousel>
            </PostConsumer>
        </PostProvider>
    </Container>
}
export default PostCarousel