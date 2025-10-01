# Notes for developing the HPESC zip file for upload

This is a stripped down theme (based on pach-emdash ) specifically for building output for the HPE support site

**NOTE:** After running scripts on the source content make sure **not** to check those changes back to the source repo. The changes will most likely break the build for the pach-emdash theme.

## build for HPESC

1. **preprocess source docs:** find/replace ```node .\themes\hpesc\run-multi-replace.js```

1. **build html with HPESC theme:** ```hugo --config .\hugo_HPESC_latest.yaml``` 

    NOTE: The broken link messages do not reflect actual broken links. You can verify by checking links later in the process.

1. **post process stack tables and remove highlighting from code:** ```node .\themes\hpesc\reformat-tables.js```

1. **post process mermaid entries:** ```node .\themes\hpesc\regenerate-mermaid-code.js```

1. **(Optional) run internal link checker:** ```./htmltest.exe -s``` must download htmltest https://github.com/wjdp/htmltest/releases/tag/v0.17.0

1. Zip contents of public folder and use that to upload to HPESC.




## Major differences of this theme vs pach-emdash

* The wizard components had to be displayed in a table since the HPESC does not have a comparable feature
* The following folders are ignored in the build since some are older releases and others contain tutorials that have files too large to support on hpesc.
  * 2.6.x
  * 2.7.x
  * 2.8.x
  * latest/build-dags/tutorials/data-parallelism/
  * latest/build-dags/tutorials/task-parallelism/
  * latest/sdk/examples/breast_cancer_detection/
* The default cover page had to be simplified. 
* The mermaid svg files needed to be statically generated and not controlled by css. In some cases they look larger than desired.