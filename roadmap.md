# Roadmap (possible)

Focus on image use cases first. Build useful applications around CanvasPanel for narratives and simple viewing experiences. Build on the component landscape of the Universal Viewer (starting with Manifesto) wherever possible.

Where to start for Minimum Viable Product

### 1. V&A Ocean Liners

[V&A - Ocean Liners](https://canvas-panel.netlify.com/#/examples/oceanliners)

The V&A’s Ocean Liners example is a simpler expression of the Bosch layout. Prototype the desired developer experience to reproduce the V&A’s Ocean Liners example (ignoring content creation itself). What does the code look like to produce the Ocean Liners?

The MVP works on a single IIIF Presentation 3 Canvas that links to an Annotation Collection of commenting annotations (W3C model) each of which target a point, using `<x>,<y>,1,1` fragment syntax. Label and text generates the boxes. Textual content can be HTML if images and formatting are required. Configuration produces the behaviour seen in the linked example above.

The aim is to finesse the API and development experience to make reuse as easy as possible.

### 2. Reproduce the simpler Google Arts And Culture UI with pure IIIF

[Ocean Liners in style of Google Arts and Culture](https://canvas-panel.netlify.com/#/examples/fullpage)

Initial version done, needs more work on how it is used by a containing page.

### 3. Use CanvasPanel in narratives

Here the viewing application is playing a IIIF Manifest, and using CanvasPanel multiple times.

[Example of linear narrative from Google Arts and Culture](https://www.google.com/culturalinstitute/beta/exhibit/-wIivb9hDv4rJQ)

That this is a combination of static images (which still might come from IIIF) with canvas labels and descriptions (which can be HTML), and annotations on those canvases (some canvases have a mini story within them, in the form of annotations). Not all canvases require their own annotations to make this work.

There is more than one way to do this. The narrative could be told through IIIF ranges, which is perhaps a better way of doing this transition. There’s also the possibility that one or more canvases within the sequence carries a set of annotations like the Patchwork set; taking all this together a sequence of nexts could result in:

Canvas -> Canvas -> Canvas -> Segment -> Segment -> Canvas -> Annotation -> Annotation -> Annotation

The navigation sequence is defined in the Range, the first three here point to whole canvases, then two further regions of the third canvas, then a fourth canvas, then three annotations on that fourth canvas.

### 4. Content Creation

Use [Bodleian Manifest Editor](https://github.com/bodleian/iiif-manifest-editor). With additions, not least support for Presentation 3 API.

### Beyond

* Advanced Association Features - handle the [various composition possibilities](http://iiif.io/api/presentation/2.1/#advanced-association-features) described in the current P2 specification (which will be part of an external cookbook for P3), taking inspiration from iiifManifestLayouts
* Develop the event model by prototyping
* Refine the API to suit development requirements for common use cases
* Text handling (from `transcription` and `painting` motivations)
* Time-based media
* Use in content creation tools (Annotation Studio) - using CanvasPanel as the capture surface
* More advanced text handling - overlaying HTML representation from annotations
* Canvas on Canvas support
* Thumbnail optimisation
* Access-controlled content
