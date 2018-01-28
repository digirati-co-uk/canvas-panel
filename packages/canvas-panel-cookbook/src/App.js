import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Patchwork from './Patchwork';
import FullPagePatchwork from './FullPagePatchwork';
import './App.css';
import PopOut from './PopOut';

const Homepage = () => (
  <section
    style={{ maxWidth: 1100, margin: 'auto', padding: 30, lineHeight: '1.8em' }}
  >
    <h2>Canvas Panel Cookbook</h2>
    <p>
      Prototype covering the specification of Canvas Panel, and supporting
      components for composing bespoke IIIF viewers and lightweight experiences,
      conforming to the IIIF Presentation 3 specification.
    </p>
    <p>
      For more information and background, see{' '}
      <NavLink activeClassName="navigation-active" to="/about">
        About CanvasPanel
      </NavLink>
    </p>
  </section>
);

const About = () => (
  <section
    style={{ maxWidth: 1100, margin: 'auto', padding: 30, lineHeight: '1.8em' }}
  >
    <article className="markdown-body entry-content" itemprop="text">
      <h1>
        <a
          href="#about-canvaspanel"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-about-canvaspanel"
        />About CanvasPanel
      </h1>
      <p>
        <em>
          This page is an updated version of{' '}
          <a href="https://gist.github.com/tomcrane/e03d5b0405cb23f937ef86aa8f2ae575">
            this gist
          </a>{' '}
          from 2016.
        </em>
      </p>
      <p>
        CanvasPanel is a component that sits between tile renderers like
        OpenSeadragon (OSD) or Leaflet, and Manifest viewers like UV and
        Mirador. It can be reused in very simple IIIF applications - a few lines
        of JavaScript - but is sophisticated enough to form the basis of custom
        applications with complex layout and annotation rendering requirements.
      </p>
      <h2>
        <a
          href="#introduction"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-introduction"
        />Introduction
      </h2>
      <p>
        OSD and Leaflet understand the IIIF <em>Image</em> API. They know how to
        take a definition of a tile source (an Image API endpoint) and generate
        tile requests for deep zoom. They both offer APIs for drawing additional
        content onto their rendering surfaces, but the native model isn’t IIIF.
      </p>
      <p>
        Mirador, UV and other IIIF <em>Presentation</em> API clients understand
        what a Manifest is and provide navigation, metadata and other services
        across the Manifest, with varying levels of support for rendering the
        content of the Canvases that make up that manifest. Support for image
        segments, image choice, non-image annotations and other parts of the
        Presentation specification is variable and addresses some use cases but
        not others.
      </p>
      <p>
        If you want to build an ad hoc user experience from IIIF resources -
        content assembled on a Canvas - you either have to code upwards from OSD
        or Leaflet, or (in theory) strip back the visible UI of the UV via
        configuration, removing Manifest-level user interface. But the latter
        approach won’t <strong>yet</strong> give you the interface and services
        you need to build something like{' '}
        <a
          href="https://tuinderlusten-jheronimusbosch.ntr.nl/en"
          rel="nofollow"
          target="_blank"
        >
          The Garden of Earthly Delights
        </a>{' '}
        easily. CanvasPanel is a component for use in ways similar OSD or
        Leaflet, but you give it a IIIF Canvas instead of a tile source. It
        provides the interface (properties, methods, events) to allow you to
        build things like the Hieronymus Bosch example quickly, using the IIIF
        Canvas as the model and format to assemble content.
      </p>
      <p>
        A Canvas is a scene, with content positioned in that scene through
        annotation. The <code>motivation</code> property of annotations
        influences the user experience. The content provided by the annotations
        might be static images, images with tile source services for deep zoom,
        text, comments, markers (highlights), video and audio sources, or custom
        application-specific datasets. In IIIF Presentation 3 the Canvas can
        have a duration, allowing content to be placed in time as well as space.
      </p>
      <p>Here are some potential usage scenarios:</p>
      <ul>
        <li>
          <a
            href="https://tuinderlusten-jheronimusbosch.ntr.nl/en"
            rel="nofollow"
            target="_blank"
          >
            The Garden of Earthly Delights
          </a>
        </li>
        <li>
          <a
            href="http://ghp.wellcomecollection.org/annotation-viewer/quilt/"
            rel="nofollow"
            target="_blank"
          >
            Sleep Stories
          </a>{' '}
          (and{' '}
          <a
            href="http://ghp.wellcomecollection.org/annotation-viewer/quilt.html"
            rel="nofollow"
            target="_blank"
          >
            dev version with tagging annotations
          </a>)
        </li>
        <li>
          <a
            href="https://www.vam.ac.uk/articles/ann-wests-patchwork"
            rel="nofollow"
            target="_blank"
          >
            Ann West’s Patchwork
          </a>, and{' '}
          <a
            href="https://www.google.com/culturalinstitute/beta/story/AgISuICLClPdIQ"
            rel="nofollow"
            target="_blank"
          >
            a variant UI
          </a>
        </li>
        <li>
          (central panel of){' '}
          <a
            href="https://exhibitions.library.nuigalway.ie/oshaughnessy-memoir/"
            rel="nofollow"
            target="_blank"
          >
            O’Shaughnessy memoir
          </a>{' '}
          (with linking annotations)
        </li>
        <li>
          Digirati{' '}
          <a href="https://github.com/digirati-co-uk/annotation-studio">
            Annotation Studio
          </a>
        </li>
        <li>UV’s OpenSeadragon Extension</li>
        <li>Mirador’s central panel</li>
        <li>
          <a
            href="https://tomcrane.github.io/fire/"
            rel="nofollow"
            target="_blank"
          >
            Fire AV Demo
          </a>{' '}
          (and{' '}
          <a
            href="https://universalviewer.io/examples/#?c=0&amp;m=0&amp;s=0&amp;cv=0&amp;manifest=https%3A%2F%2Fiiif-commons.github.io%2Fiiif-av-component%2Fexamples%2Fdata%2Fiiif%2Ffire.json"
            rel="nofollow"
            target="_blank"
          >
            again
          </a>) (and{' '}
          <a
            href="https://kanzaki.com/works/2016/pub/image-annotator?u=https://tomcrane.github.io/fire/manifest3.json"
            rel="nofollow"
            target="_blank"
          >
            again
          </a>)
        </li>
        <li>
          <a
            href="https://kanzaki.com/works/2016/pub/image-annotator?u=/works/2017/annot/tchaiko-serenade-2mov-manifest.json"
            rel="nofollow"
            target="_blank"
          >
            Tchaikovsky: Serenade for Strings, 2nd Mov
          </a>
        </li>
      </ul>
      <p>
        CanvasPanel’s interface should make it easy to build things like this.
        In some cases, trivial, by following cookbook recipes. The Bosch and
        Patchwork examples in particular should be mostly a matter of assembling
        the content, and configuration.
      </p>
      <p>
        Since the first version of this document, further development activity
        in the IIIF Community and the imminent arrival of Presentation 3 have
        moved the story on somewhat:
      </p>
      <ul>
        <li>
          <a href="https://github.com/sul-dlss/iiifManifestLayouts">
            iiifManifestLayouts
          </a>{' '}
          and{' '}
          <a href="https://github.com/sul-dlss/iiif-evented-canvas">
            iiif-evented-canvas
          </a>{' '}
          (as used by Mirador) show the way for some of CanvasPanel’s features,
          like thumbnail substitution (see below) and models for component
          collaboration.
        </li>
        <li>
          IIIF-AV requires{' '}
          <a href="https://github.com/digirati-co-uk/iiif-av-bl">
            consideration of other renderers
          </a>; it’s not just about static composition of one or more deep zoom
          tile sources in a viewport
        </li>
        <li>
          IIIF-AV requires duration consideration and therefore{' '}
          <a href="https://gist.github.com/tomcrane/97a7c27e37455fed11f16365c8d90f7e">
            canvas timing
          </a>
        </li>
        <li>
          Presentation 3 introduces the{' '}
          <a href="https://github.com/IIIF/api/issues/1258">transcribing</a>{' '}
          motivation, which clarifies the intent of some text annotations
        </li>
        <li>
          Presentation 3 introduces{' '}
          <a href="https://github.com/IIIF/api/issues/1191">
            canvas-on-canvas annotation
          </a>, which has some interesting benefits beyond packaged reuse of
          complex content.
        </li>
        <li>
          There are emerging algorithms and best practices for{' '}
          <a
            href="http://tomcrane.github.io/iiif-expts/getthumbnail/"
            rel="nofollow"
            target="_blank"
          >
            thumbnail
          </a>{' '}
          provision
        </li>
      </ul>
      <p>
        CanvasPanel doesn’t have its own UI, either for navigation (e.g.,
        panning and zooming) or for the styling of rendering of annotations like
        map markers. However, out of the box it would come with an example of
        configuration, navigation and map marker images that can produce the
        Patchwork example through configuration alone.
      </p>
      <h2>
        <a
          href="#architecture"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-architecture"
        />Architecture
      </h2>
      <p>
        CanvasPanel need only work with a Presentation 3 Canvas, for simplicity.
        The component is initialised with a single Canvas, as a JavaScript
        object. How that Canvas was acquired is not CanvasPanel’s concern, but a
        simple cookbook recipe can show how to load a Canvas into it, either
        from a standalone dereferenceable Canvas URI, or by loading a Manifest
        then finding the specific Canvas within it. Canvases conforming to
        previous versions of the API can be converted to Presentation 3 by the
        JavaScript (runs in a browser) version of the{' '}
        <a href="https://github.com/iiif-prezi/prezi-2-to-3">converter</a>. This
        JavaScript version does{' '}
        <a
          href="https://iiif.slackarchive.io/softwaredevs/page-13/ts-1515689562000053"
          rel="nofollow"
          target="_blank"
        >
          not yet exist
        </a>, but is needed for this and many other applications.
      </p>
      <p>
        CanvasPanel is a component that renders, in a web browser. That is, it
        causes pixels to be drawn. Maybe it is a Web Component. It needs to do
        some of the same things that (say) Mirador does when you view textual
        annotations or toggle the visibility of image choice, driven by an
        interface of events, properties, methods.
      </p>
      <p>
        Maybe CanvasPanel uses Manifesto, Manifold, iiifManifestLayouts,
        iiif-evented-canvas or components similar to these, or evolutions of
        these. It is responsible for rendering content of a Canvas, but in doing
        so it can provide services to a higher level containing application for
        processing that content, and an event model to allow the higher level
        application to react to events on the canvas, and control the viewport
        of the canvas, the visibility of different pieces of content
        (annotations) and the rendering of textual content like commentary.
      </p>
      <p>For example:</p>
      <ul>
        <li>
          <p>
            Text transcriptions are part of the Canvas content, and could be
            rendered in the Canvas viewport (on top of images, perhaps) but
            could also be rendered to the side, by the higher level application.
            User selection of text lines or parts on the text “to the side”
            could be echoed by selection/highlighting on the canvas surface, as
            in{' '}
            <a
              href="https://dspace-glam.4science.it/explore?bitstream_id=1877&amp;handle=1234/11&amp;provider=iiif-image#?c=0&amp;m=0&amp;s=0&amp;cv=0&amp;xywh=-5874%2C-391%2C16846%2C7798"
              rel="nofollow"
              target="_blank"
            >
              this example
            </a>{' '}
            where the UV is the higher level application.
          </p>
        </li>
        <li>
          <p>
            In the Patchwork example on the V&amp;A site, the Canvas would have
            a linked annotation list of commenting annotations. CanvasPanel
            could drive the observed user experience, but needs to be configured
            with information such as:
          </p>
          <ul>
            <li>The image to use for markers of point annotations</li>
            <li>The image to use for a selected marker</li>
            <li>
              That the annotation body should appear in the top left when a
              marker is selected
            </li>
            <li>
              That the viewport should move and zoom in a certain amount when an
              annotation is selected
            </li>
            <li>Behaviour of the panel for entering and exiting full screen</li>
            <li>CSS styling for the above</li>
          </ul>
        </li>
      </ul>
      <p>
        Compare this with the quilt example - there are many similarities; to
        what extent is this the same component just differing in configuration?
        How much code should you have to write to produce each of these two user
        experiences from the same component? What does that code look like? How
        do you style it all with CSS? Do you need to hook into rendering events
        to take control, injecting content into the DOM, or are these two
        examples simple enough to work through configuration?
      </p>
      <ul>
        <li>
          In the Patchwork example on the Google Arts and Culture site, similar
          source data produces a very different user experience.
        </li>
      </ul>
      <h2>
        <a
          href="#as-a-component"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-as-a-component"
        />As a component
      </h2>
      <p>
        If you’re looking to build a bespoke Manifest viewer, CanvasPanel is a
        major component of it. In this respect it can work with the UV just like
        the UV’s current OpenSeadragon module. It can sit in other harnesses
        too, the simplest being a web page that emits multiple CanvasPanels, one
        for each page, and passes them their appropriate Canvas after parsing
        the Manifest.
      </p>
      <p>
        The UV uses libraries like Manifesto, but so would CanvasPanel. What’s
        the relationship between them, the division of responsibility?
        CanvasPanel, to function as a standalone component, needs certain
        capabilities that typical containing applications are also likely to
        need. For example, collecting the text content of multiple canvases for
        some purpose. CanvasPanel has the means of collecting the text
        annotations because it might want to draw them; can the containing
        application reuse this capability for content collection and processing?
        That is, use CanvasPanel’s functionality on top of the Canvas model for
        its own purposes? Then CanvasPanel is doing two things - it’s a
        renderer, and a library of functionality on top of the model, like
        Manifesto+Manifold. CanvasPanel and the containing application are
        likely to be referencing the same libraries, implying a separation and
        collaboration between the containing application, CanvasPanel and these
        libraries - but that would hinder standalone usage. In the other
        direction, the Manifest-level client’s understanding of IIIF Ranges may
        be expressed by drawing range boundaries on the Canvas, through
        CanvasPanel’s API. An example Range is a newspaper article spread across
        pages and columns, covering parts of several Canvases. These
        boundaries/highlights aren’t coming from annotation content that the
        CanvasPanel component can see, they are Manifest-level structural
        information that the higher level client needs to express by
        highlighting the Range boundaries on the Canvas, through CanvasPanel’s
        API.
      </p>
      <p>
        CanvasPanel, then, needs to work with other components to render
        non-painting annotations outside of itself, but can supply those other
        components with prepared or transformed content to render. For example,
        text transcriptions; it can render them itself, on the canvas; or it can
        pass constructed text or html representation externally for rendering by
        a larger client (like the UV). “This is a representation of canvas
        content that you can choose to display off-canvas”. Same for commentary,
        textual and other media annotations that are not painting.
      </p>
      <p>
        Does CanvasPanel make HTTP requests for content or does it interact with
        its harness, and get given content? It needs to be very simple in use
        for common scenarios, so it probably should take care of fetching
        content itself rather than rely on being fed content through a complex
        event interaction. It notifies its harness through events as content
        loads, and can be given new content via the API as well as following
        references from the supplied Canvas. The UV’s current handling of
        external resources is a useful reference. And like OSD with a IIIF Image
        description, it can be given a Canvas as a JavaScript object or as a
        URL.
      </p>
      <p>
        More{' '}
        <a href="https://gist.github.com/tomcrane/e03d5b0405cb23f937ef86aa8f2ae575#gistcomment-1787753">
          thoughts
        </a>{' '}
        on the tension between state management and self-contained reusable
        components.
      </p>
      <h2>
        <a
          href="#canvas-on-canvas"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-canvas-on-canvas"
        />Canvas on Canvas
      </h2>
      <p>Presentation 3 permits a canvas to be annotated onto a canvas.</p>
      <p>
        The rationale for this is ease of reuse of complex aggregations of
        content - an image with its text transcriptions, a video with captions.
        The assumption (and justification) is that the canvas-as-annotation-body
        can be expanded and decomposed into a set of direct content annotations
        on the parent canvas; no matter how complex or deep, annotations on
        linked Canvases can be transformed to direct annotations in the main
        canvas dimensions.
      </p>
      <p>
        CanvasPanel therefore needs to be able to understand and render Canvases
        annotated onto Canvases. Once it can do this, it has an interesting new
        capability: 2-up, or n-up renderings of content are the same thing as
        the single canvas view. If you want a 2-up, paged view, just construct a
        new Canvas on the fly, annotate the two pages onto it in the right
        places, and send the new Canvas to be rendered - CanvasPanel doesn’t
        care, it’s all just a single canvas. Nothing new is required for facing
        pages renderings of two Canvases, the containing application constructs
        a new Canvas with the two facing canvases positioned correctly and then
        passes this to CanvasPanel.
      </p>
      <p>
        When combined with iiifManifestLayouts’ approach to thumbnails, this
        becomes really interesting. iiifManifestLayouts renders a canvas using
        its thumbnail property until the canvas is big enough in the viewport to
        require “full” rendering (and returns to thumbnail when it drops back
        down). An n-up display created by annotating multiple canvases onto a
        single parent canvas then works like iiifManifestLayouts. The thumbnail
        selection code can be further enhanced, including support for non-image
        thumbs. Performance is optimized by not loading or rendering canvas
        resources until the canvas is ready, or big enough to make rendering
        that content useful. This deferred loading is still useful in 1-up mode
        where CanvasPanel can evaluate what content is available for quick
        display while the canvas content loads.
      </p>
      <p>
        The UV’s left hand thumb panel, opened-out gallery view and Mirador’s
        thumbnail strip could all be implemented by CanvasPanel with appropriate
        behaviour - although the UV’s iiif-gallery-component has additional
        functionality and potential Collection-handling capabilities that might
        not make this approach worthwhile.
      </p>
      <h2>
        <a
          href="#scene-evaluation"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-scene-evaluation"
        />Scene Evaluation
      </h2>
      <p>To deep zoom or not to deep zoom?</p>
      <p>
        As a general purpose Canvas renderer, CanvasPanel needs to evaluate the
        content before deciding what will be used to render it. A Canvas with
        one annotation of a static image with no accompanying image service
        could be rendered by emitting an HTML image tag. CSS could be used to
        crop or mask segments. When a tile source is available, OpenSeadragon
        can be used. When video is available, HTML5 media elements can be used.
        Various combinations of techniques are possible, but not always
        desirable. In a scene comprising mainly video, text and static images,
        should OpenSeadragon be used just because one of the images happens to
        have an image service? At other times there will be no need for a tile
        renderer at all, which suggests that annotation rendering should belong
        to the CanvasPanel itself rather than being deferred to OSD or Leaflet’s
        capabilities in those areas. CanvasPanel owns the display of any
        additional content.
      </p>
      <p>
        CanvasPanel could selectively load sub components, to avoid loading
        capabilities it doesn’t need for a particular scene.
      </p>
      <h2>
        <a
          href="#rendering-space"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-rendering-space"
        />Rendering Space
      </h2>
      <div className="highlight highlight-text-html-basic">
        <pre>
          &lt;<span className="pl-ent">canvasPanel</span>{' '}
          <span className="pl-e">width</span>=<span className="pl-s">
            ”1000”
          </span>{' '}
          <span className="pl-e">height</span>=<span className="pl-s">
            ”1000”
          </span>{' '}
          <span className="pl-e">canvas</span>=<span className="pl-s">
            ”http://uri-of-canvas”
          </span>{' '}
          <span className="pl-e">within</span>=<span className="pl-s">
            ”http://uri-of-manifest”
          </span>{' '}
          /&gt;
        </pre>
      </div>
      <p>(or invoke a CanvasPanel behaviour on a div element through script)</p>
      <p>
        What is the behaviour of a CanvasPanel instance declared like this? It
        should take up 1000x1000 pixels of page space - but how does that relate
        to the dimensions of the loaded Canvas? The page space occupied by the
        element can be a viewport on the Canvas if zoomed in. If not zoomed in
        and with no other configuration it should settle on fitting to bounds,
        leaving letterbox or postbox bars if the aspect ratio of the element and
        the loaded Canvas differ.
      </p>
      <h2>
        <a
          href="#authentication-interaction"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-authentication-interaction"
        />Authentication interaction
      </h2>
      <p>
        CanvasPanel probably does not handle all of the authentication
        interaction patterns for a Canvas’s content, but needs to be aware that
        content might be subject to access control. Presentation of access
        control messaging is likely to be orchestrated by the higher level
        application (the UV does this, not the content renderer) - but what
        about using CanvasPanel on its own for access controlled content?
      </p>
      <h2>
        <a
          href="#minimum-viable-product"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-minimum-viable-product"
        />Minimum Viable Product
      </h2>
      <p>Where to start?</p>
      <p>
        To test the assumptions and direction described above, a short
        development project - taking components from Digirati’s annotation
        studio, and simple viewer for Galway.
      </p>
      <h3>
        <a
          href="#iteration-1"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-iteration-1"
        />Iteration 1
      </h3>
      <p>
        Prototype the desired developer experience that would produce the
        V&amp;A’s patchwork example (ignoring content creation itself). What
        does the code look like to produce the Patchwork?
      </p>
      <p>
        The V&amp;A’s Patchwork example is a simpler expression of the Bosch
        layout.
      </p>
      <p>
        The MVP works on a single IIIF Presentation 3 Canvas that links to an
        Annotation Collection of commenting annotations (W3C model) each of
        which target a point, using <code>&lt;x&gt;,&lt;y&gt;,1,1</code>{' '}
        fragment syntax. Label and text generates the boxes. Textual content can
        be HTML if images and formatting are required.
      </p>
      <p>
        Configuration produces the behaviour seen in the linked example above.
      </p>
      <p>
        The aim is to finesse the API and development experience to make reuse
        as easy as possible.
      </p>
      <h4>
        <a
          href="#interaction-with-the-parent-page"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-interaction-with-the-parent-page"
        />Interaction with the parent page
      </h4>
      <p>
        Gather further requirements from the V&amp;A and other interested
        parties keen on seeing a reusable Canvas component.
      </p>
      <p>
        Deliver a robust and working piece of software for the V&amp;A and
        others to use in similar circumstances.
      </p>
      <h3>
        <a
          href="#iteration-2"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-iteration-2"
        />Iteration 2
      </h3>
      <p>
        Advanced Association Features - handle the{' '}
        <a
          href="http://iiif.io/api/presentation/2.1/#advanced-association-features"
          rel="nofollow"
          target="_blank"
        >
          various composition possibilities
        </a>{' '}
        described in the current P2 specification (which will be part of an
        external cookbook for P3), taking inspiration from iiifManifestLayouts
      </p>
      <h2>
        <a
          href="#further-iterations"
          aria-hidden="true"
          className="anchor"
          htmlId="user-content-further-iterations"
        />Further iterations
      </h2>
      <ul>
        <li>Uncovering the event model by prototyping</li>
        <li>
          Refining the API to suit development requirements for common use cases
        </li>
        <li>Text handling</li>
        <li>Time-based media</li>
        <li>
          Use in content creation tools (Annotation Studio) - using CanvasPanel
          as the capture surface
        </li>
        <li>
          More advanced text handling - overlaying HTML representation from
          annotations
        </li>
        <li>Canvas on Canvas support</li>
        <li>Thumbnail optimisation</li>
        <li>Access-controlled content</li>
      </ul>
    </article>
  </section>
);

const App = () => (
  <Router>
    <main>
      <header>
        <ul className="app-navigation">
          <li>
            <NavLink activeClassName="navigation-active" to="/">
              Cookbook
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/patchwork">
              Patchwork
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/fullpage">
              Full page
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/popout">
              Pop out
            </NavLink>
          </li>
          <li>
            <a href="/styleguide">Documentation</a>
          </li>
        </ul>
      </header>

      <Route exact path="/" component={Homepage} />
      <Route exact path="/about" component={About} />
      <Route path="/patchwork" component={Patchwork} />
      <Route path="/fullpage" component={FullPagePatchwork} />
      <Route path="/popout" component={PopOut} />
    </main>
  </Router>
);
export default App;
