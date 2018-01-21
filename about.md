# About CanvasPanel

_This page is an updated version of [this gist](https://gist.github.com/tomcrane/e03d5b0405cb23f937ef86aa8f2ae575) from 2016._

CanvasPanel is a component that sits between tile renderers like OpenSeadragon (OSD) or Leaflet, and Manifest viewers like UV and Mirador. It can be reused in very simple IIIF applications - a few lines of JavaScript - but is sophisticated enough to form the basis of custom applications with complex layout and annotation rendering requirements.

## Introduction

OSD and Leaflet understand the IIIF _Image_ API. They know how to take a definition of a tile source (an Image API endpoint) and generate tile requests for deep zoom. They both offer APIs for drawing additional content onto their rendering surfaces, but the native model isn’t IIIF.

Mirador, UV and other IIIF _Presentation_ API clients understand what a Manifest is and provide navigation, metadata and other services across the Manifest, with varying levels of support for rendering the content of the Canvases that make up that manifest. Support for image segments, image choice, non-image annotations and other parts of the Presentation specification is variable and addresses some use cases but not others.

If you want to build an ad hoc user experience from IIIF resources - content assembled on a Canvas - you either have to code upwards from OSD or Leaflet, or (in theory) strip back the visible UI of the UV via configuration, removing Manifest-level user interface. But the latter approach won’t **yet** give you the interface and services you need to build something like [The Garden of Earthly Delights](https://tuinderlusten-jheronimusbosch.ntr.nl/en) easily. CanvasPanel is a component for use in ways similar OSD or Leaflet, but you give it a IIIF Canvas instead of a tile source. It provides the interface (properties, methods, events) to allow you to build things like the Hieronymus Bosch example quickly, using the IIIF Canvas as the model and format to assemble content.

A Canvas is a scene, with content positioned in that scene through annotation. The `motivation` property of annotations influences the user experience. The content provided by the annotations might be static images, images with tile source services for deep zoom, text, comments, markers (highlights), video and audio sources, or custom application-specific datasets. In IIIF Presentation 3 the Canvas can have a duration, allowing content to be placed in time as well as space.

Here are some potential usage scenarios:

* [The Garden of Earthly Delights](https://tuinderlusten-jheronimusbosch.ntr.nl/en)
* [Sleep Stories](http://ghp.wellcomecollection.org/annotation-viewer/quilt/) (and [dev version with tagging annotations](http://ghp.wellcomecollection.org/annotation-viewer/quilt.html))
* [Ann West’s Patchwork](https://www.vam.ac.uk/articles/ann-wests-patchwork), and [a variant UI](https://www.google.com/culturalinstitute/beta/story/AgISuICLClPdIQ)
* (central panel of) [O’Shaughnessy memoir](https://exhibitions.library.nuigalway.ie/oshaughnessy-memoir/) (with linking annotations)
* Digirati [Annotation Studio](https://github.com/digirati-co-uk/annotation-studio)
* UV’s OpenSeadragon Extension
* Mirador’s central panel
* [Fire AV Demo](https://tomcrane.github.io/fire/) (and [again](https://universalviewer.io/examples/#?c=0&m=0&s=0&cv=0&manifest=https%3A%2F%2Fiiif-commons.github.io%2Fiiif-av-component%2Fexamples%2Fdata%2Fiiif%2Ffire.json)) (and [again](https://kanzaki.com/works/2016/pub/image-annotator?u=https://tomcrane.github.io/fire/manifest3.json))
* [Tchaikovsky: Serenade for Strings, 2nd Mov](https://kanzaki.com/works/2016/pub/image-annotator?u=/works/2017/annot/tchaiko-serenade-2mov-manifest.json)

CanvasPanel’s interface should make it easy to build things like this. In some cases, trivial, by following cookbook recipes. The Bosch and Patchwork examples in particular should be mostly a matter of assembling the content, and configuration.

Since the first version of this document, further development activity in the IIIF Community and the imminent arrival of Presentation 3 have moved the story on somewhat:

* [iiifManifestLayouts](https://github.com/sul-dlss/iiifManifestLayouts) and [iiif-evented-canvas](https://github.com/sul-dlss/iiif-evented-canvas) (as used by Mirador) show the way for some of CanvasPanel’s features, like thumbnail substitution (see below) and models for component collaboration.
* IIIF-AV requires [consideration of other renderers](https://github.com/digirati-co-uk/iiif-av-bl); it’s not just about static composition of one or more deep zoom tile sources in a viewport
* IIIF-AV requires duration consideration and therefore [canvas timing](https://gist.github.com/tomcrane/97a7c27e37455fed11f16365c8d90f7e)
* Presentation 3 introduces the [transcribing](https://github.com/IIIF/api/issues/1258) motivation, which clarifies the intent of some text annotations
* Presentation 3 introduces [canvas-on-canvas annotation](https://github.com/IIIF/api/issues/1191), which has some interesting benefits beyond packaged reuse of complex content.
* There are emerging algorithms and best practices for [thumbnail](http://tomcrane.github.io/iiif-expts/getthumbnail/) provision

CanvasPanel doesn’t have its own UI, either for navigation (e.g., panning and zooming) or for the styling of rendering of annotations like map markers. However, out of the box it would come with an example of configuration, navigation and map marker images that can produce the Patchwork example through configuration alone.

## Architecture

CanvasPanel need only work with a Presentation 3 Canvas, for simplicity. The component is initialised with a single Canvas, as a JavaScript object. How that Canvas was acquired is not CanvasPanel’s concern, but a simple cookbook recipe can show how to load a Canvas into it, either from a standalone dereferenceable Canvas URI, or by loading a Manifest then finding the specific Canvas within it. Canvases conforming to previous versions of the API can be converted to Presentation 3 by the JavaScript (runs in a browser) version of the [converter](https://github.com/iiif-prezi/prezi-2-to-3). This JavaScript version does [not yet exist](https://iiif.slackarchive.io/softwaredevs/page-13/ts-1515689562000053), but is needed for this and many other applications.

CanvasPanel is a component that renders, in a web browser. That is, it causes pixels to be drawn. Maybe it is a Web Component. It needs to do some of the same things that (say) Mirador does when you view textual annotations or toggle the visibility of image choice, driven by an interface of events, properties, methods.

Maybe CanvasPanel uses Manifesto, Manifold, iiifManifestLayouts, iiif-evented-canvas or components similar to these, or evolutions of these. It is responsible for rendering content of a Canvas, but in doing so it can provide services to a higher level containing application for processing that content, and an event model to allow the higher level application to react to events on the canvas, and control the viewport of the canvas, the visibility of different pieces of content (annotations) and the rendering of textual content like commentary.

For example:

* Text transcriptions are part of the Canvas content, and could be rendered in the Canvas viewport (on top of images, perhaps) but could also be rendered to the side, by the higher level application. User selection of text lines or parts on the text “to the side” could be echoed by selection/highlighting on the canvas surface, as in [this example](https://dspace-glam.4science.it/explore?bitstream_id=1877&handle=1234/11&provider=iiif-image#?c=0&m=0&s=0&cv=0&xywh=-5874%2C-391%2C16846%2C7798) where the UV is the higher level application.

* In the Patchwork example on the V&A site, the Canvas would have a linked annotation list of commenting annotations. CanvasPanel could drive the observed user experience, but needs to be configured with information such as:

  * The image to use for markers of point annotations
  * The image to use for a selected marker
  * That the annotation body should appear in the top left when a marker is selected
  * That the viewport should move and zoom in a certain amount when an annotation is selected
  * Behaviour of the panel for entering and exiting full screen
  * CSS styling for the above

Compare this with the quilt example - there are many similarities; to what extent is this the same component just differing in configuration? How much code should you have to write to produce each of these two user experiences from the same component? What does that code look like? How do you style it all with CSS? Do you need to hook into rendering events to take control, injecting content into the DOM, or are these two examples simple enough to work through configuration?

* In the Patchwork example on the Google Arts and Culture site, similar source data produces a very different user experience.

## As a component

If you’re looking to build a bespoke Manifest viewer, CanvasPanel is a major component of it. In this respect it can work with the UV just like the UV’s current OpenSeadragon module. It can sit in other harnesses too, the simplest being a web page that emits multiple CanvasPanels, one for each page, and passes them their appropriate Canvas after parsing the Manifest.

The UV uses libraries like Manifesto, but so would CanvasPanel. What’s the relationship between them, the division of responsibility? CanvasPanel, to function as a standalone component, needs certain capabilities that typical containing applications are also likely to need. For example, collecting the text content of multiple canvases for some purpose. CanvasPanel has the means of collecting the text annotations because it might want to draw them; can the containing application reuse this capability for content collection and processing? That is, use CanvasPanel’s functionality on top of the Canvas model for its own purposes? Then CanvasPanel is doing two things - it’s a renderer, and a library of functionality on top of the model, like Manifesto+Manifold. CanvasPanel and the containing application are likely to be referencing the same libraries, implying a separation and collaboration between the containing application, CanvasPanel and these libraries - but that would hinder standalone usage. In the other direction, the Manifest-level client’s understanding of IIIF Ranges may be expressed by drawing range boundaries on the Canvas, through CanvasPanel’s API. An example Range is a newspaper article spread across pages and columns, covering parts of several Canvases. These boundaries/highlights aren’t coming from annotation content that the CanvasPanel component can see, they are Manifest-level structural information that the higher level client needs to express by highlighting the Range boundaries on the Canvas, through CanvasPanel’s API.

CanvasPanel, then, needs to work with other components to render non-painting annotations outside of itself, but can supply those other components with prepared or transformed content to render. For example, text transcriptions; it can render them itself, on the canvas; or it can pass constructed text or html representation externally for rendering by a larger client (like the UV). “This is a representation of canvas content that you can choose to display off-canvas”. Same for commentary, textual and other media annotations that are not painting.

Does CanvasPanel make HTTP requests for content or does it interact with its harness, and get given content? It needs to be very simple in use for common scenarios, so it probably should take care of fetching content itself rather than rely on being fed content through a complex event interaction. It notifies its harness through events as content loads, and can be given new content via the API as well as following references from the supplied Canvas. The UV’s current handling of external resources is a useful reference. And like OSD with a IIIF Image description, it can be given a Canvas as a JavaScript object or as a URL.

More [thoughts](https://gist.github.com/tomcrane/e03d5b0405cb23f937ef86aa8f2ae575#gistcomment-1787753) on the tension between state management and self-contained reusable components.

## Canvas on Canvas

Presentation 3 permits a canvas to be annotated onto a canvas.

The rationale for this is ease of reuse of complex aggregations of content - an image with its text transcriptions, a video with captions. The assumption (and justification) is that the canvas-as-annotation-body can be expanded and decomposed into a set of direct content annotations on the parent canvas; no matter how complex or deep, annotations on linked Canvases can be transformed to direct annotations in the main canvas dimensions.

CanvasPanel therefore needs to be able to understand and render Canvases annotated onto Canvases. Once it can do this, it has an interesting new capability: 2-up, or n-up renderings of content are the same thing as the single canvas view. If you want a 2-up, paged view, just construct a new Canvas on the fly, annotate the two pages onto it in the right places, and send the new Canvas to be rendered - CanvasPanel doesn’t care, it’s all just a single canvas. Nothing new is required for facing pages renderings of two Canvases, the containing application constructs a new Canvas with the two facing canvases positioned correctly and then passes this to CanvasPanel.

When combined with iiifManifestLayouts’ approach to thumbnails, this becomes really interesting. iiifManifestLayouts renders a canvas using its thumbnail property until the canvas is big enough in the viewport to require “full” rendering (and returns to thumbnail when it drops back down). An n-up display created by annotating multiple canvases onto a single parent canvas then works like iiifManifestLayouts. The thumbnail selection code can be further enhanced, including support for non-image thumbs. Performance is optimized by not loading or rendering canvas resources until the canvas is ready, or big enough to make rendering that content useful. This deferred loading is still useful in 1-up mode where CanvasPanel can evaluate what content is available for quick display while the canvas content loads.

The UV’s left hand thumb panel, opened-out gallery view and Mirador’s thumbnail strip could all be implemented by CanvasPanel with appropriate behaviour - although the UV’s iiif-gallery-component has additional functionality and potential Collection-handling capabilities that might not make this approach worthwhile.

## Scene Evaluation

To deep zoom or not to deep zoom?

As a general purpose Canvas renderer, CanvasPanel needs to evaluate the content before deciding what will be used to render it. A Canvas with one annotation of a static image with no accompanying image service could be rendered by emitting an HTML image tag. CSS could be used to crop or mask segments. When a tile source is available, OpenSeadragon can be used. When video is available, HTML5 media elements can be used. Various combinations of techniques are possible, but not always desirable. In a scene comprising mainly video, text and static images, should OpenSeadragon be used just because one of the images happens to have an image service? At other times there will be no need for a tile renderer at all, which suggests that annotation rendering should belong to the CanvasPanel itself rather than being deferred to OSD or Leaflet’s capabilities in those areas. CanvasPanel owns the display of any additional content.

CanvasPanel could selectively load sub components, to avoid loading capabilities it doesn’t need for a particular scene.

## Rendering Space

```html
<canvasPanel width=”1000” height=”1000” canvas=”http://uri-of-canvas” within=”http://uri-of-manifest” />
```

(or invoke a CanvasPanel behaviour on a div element through script)

What is the behaviour of a CanvasPanel instance declared like this? It should take up 1000x1000 pixels of page space - but how does that relate to the dimensions of the loaded Canvas? The page space occupied by the element can be a viewport on the Canvas if zoomed in. If not zoomed in and with no other configuration it should settle on fitting to bounds, leaving letterbox or postbox bars if the aspect ratio of the element and the loaded Canvas differ.

## Authentication interaction

CanvasPanel probably does not handle all of the authentication interaction patterns for a Canvas’s content, but needs to be aware that content might be subject to access control. Presentation of access control messaging is likely to be orchestrated by the higher level application (the UV does this, not the content renderer) - but what about using CanvasPanel on its own for access controlled content?

## Minimum Viable Product

Where to start?

To test the assumptions and direction described above, a short development project - taking components from Digirati’s annotation studio, and simple viewer for Galway.

### Iteration 1

Prototype the desired developer experience that would produce the V&A’s patchwork example (ignoring content creation itself). What does the code look like to produce the Patchwork?

The V&A’s Patchwork example is a simpler expression of the Bosch layout.

The MVP works on a single IIIF Presentation 3 Canvas that links to an Annotation Collection of commenting annotations (W3C model) each of which target a point, using `<x>,<y>,1,1` fragment syntax. Label and text generates the boxes. Textual content can be HTML if images and formatting are required.

Configuration produces the behaviour seen in the linked example above.

The aim is to finesse the API and development experience to make reuse as easy as possible.

#### Interaction with the parent page

Gather further requirements from the V&A and other interested parties keen on seeing a reusable Canvas component.

Deliver a robust and working piece of software for the V&A and others to use in similar circumstances.

### Iteration 2

Advanced Association Features - handle the [various composition possibilities](http://iiif.io/api/presentation/2.1/#advanced-association-features) described in the current P2 specification (which will be part of an external cookbook for P3), taking inspiration from iiifManifestLayouts

## Further iterations

* Uncovering the event model by prototyping
* Refining the API to suit development requirements for common use cases
* Text handling
* Time-based media
* Use in content creation tools (Annotation Studio) - using CanvasPanel as the capture surface
* More advanced text handling - overlaying HTML representation from annotations
* Canvas on Canvas support
* Thumbnail optimisation
* Access-controlled content
