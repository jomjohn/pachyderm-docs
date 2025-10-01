# Notes for developing the HPESC zip file for upload


## To Dos

* (done) Fix all broken links reported in publishing log

* (done) Remove "list" and "taxonomies" in outputs configuration... figure out intention of these settings.

* (done) Figure out how to point to bundle.css and favicon.ico without using root path... need relative path

* (done) Change links to filenames instead of paths.

* Figure out links from home page index.html

* (done) Create a toc.json that reflects the full toc of the project

* (done) Copy publication.json from a flat file in repo

* (done) In the TOC, remove the preceding slash "/" of the path

* (done) Test formatting of 

    * Tables

    * Codeblock

    * Notes

* (done) Remove anchors from sections

* (done) Relative links are not working on latest/get-started/beginner-tutorial.html. Not getting ugly links.

* (done) fix choice wizard CLI/Console on latest/get-started/beginner-tutorial.html

* (done) Format tiles latest/get-started.html


## Large folders maybe remove?

* latest\build-dags\tutorials\data-parallelism

* latest\build-dags\tutorials\task-parallelism

* latest\sdk\examples\breast_cancer_detection




## Global cleanup
exclude content/.archive, content/2.6.x, content/2.7.x, content/2.8.x

* (done) match {{%release%}}, replace "latest", filter "content/latest"

* (done) match {{% release %}}, replace "latest", filter "content/latest"

* (done) replace with regex match: ([^!])\[(([^\]]+))\]\((\/[^)]*)\)  replace with $1[$2]({{< ref "$4" >}})

* (done) catch ones at the begining of a line) replace with regex match: ^\[(([^\]]+))\]\((\/[^)]*)\)  replace with $1[$2]({{< ref "$4" >}})

* (done) if ref has trailing slash remove it. ((\[[^\]]+\]\(\{\{<\s*ref\s*"[^"]*?)\/("\s*>\}\}\))) with $2$3

* (done) if ref has trailing slash followed by a # remove the slash. (\[[^\]]+\]\(\{\{<\s*ref\s*"[^"]*)\/(#[^"]*"\s*>\}\}\)) with $1$2

* (done) create relref ([^!])\[(([^\]]+))\]\(([^/h{#][^)]*)\) replace with $1[$2]({{< relref "$4" >}})

* (done) if relref has .html turn it back to markdown ref. 
(\[[^\]]+\]\()\{\{<\s*relref\s*"([^"]*?(\.html|\.py|\.zip|\.txt|@|\.jsonnet|Dockerfile)[^"]*?)("\s*>\}\}\)) with $1$2)

* (done) handle relref for relative links

* (done) look into references for images.

* the _index.md files don't seem to be publishing

* (done) See why mermaid svg creating is not working for HPESC

    * https://int-itg.support.hpe.com/hpesc/docDisplay?docId=a00pachyderm29xen_us&page=latest/learn/intro-data-versioning.html

    * http://localhost:1313/latest/learn/intro-data-versioning/

* figure out this changelog page https://int-itg.support.hpe.com/hpesc/docDisplay?docId=a00pachyderm29xen_us&page=changelog.html