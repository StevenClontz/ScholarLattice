<script lang="ts">
	import { Markdown, type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
    import CodeMirror from "svelte-codemirror-editor";
    import { markdown } from "@codemirror/lang-markdown";

    export let errors: string[] | undefined
    export let constraints:  Partial<{
        pattern: string;
        min: string | number;
        max: string | number;
        required: boolean;
        step: number | "any";
        minlength: number;
        maxlength: number;
    }> | undefined
    export let value: string | null
    export let name: string
    export let preview: "md" | null = null

    $: md = value || ""
    
    const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
</script>

<div>
    <span><slot/>
    {#if errors}<span class="invalid">{errors}</span>{/if}</span>
    <div style="margin-bottom:1rem">
        <CodeMirror 
            bind:value={value}
            lang={markdown()}
            lineWrapping/>
        <div style="text-align:right">
            <small><a href="/markdown" target="_blank">Help</a></small>
        </div>
    </div>
    <input 
        {name}
        type="hidden"
        aria-invalid={errors ? 'true' : undefined}
        {value}
        {...constraints}/>
    
    
    {#if preview === "md"}
        <div style="padding:1em; border-radius:1rem; background-color:#f8f8f8; margin: 1.125rem;">
            <small style="color:#888">
                <slot/> 
                Preview (Note: some math notation may not render correctly in some browsers)
            </small>
            <hr style="border-bottom: 1px solid #aaa;"/>
            <div>
                <Markdown {md} {plugins}/>
            </div>
        </div>
    {/if}
</div>


<style>
	.invalid {
	  	color: red;
	}
</style>