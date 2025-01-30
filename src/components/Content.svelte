<script lang="ts">
    import type { ProjectInfo } from '$lib/types';
    import { slide, crossfade, scale  } from "svelte/transition";
    
    const [send, receive] = crossfade({duration: 300, fallback: scale});
    
    let viewing_id : number = $state(0);
    
    
    const cards_content : ProjectInfo[] = [
        {unique_id: 1, title: "AI Models",      description: "This is for testing. And this is more text."},
        {unique_id: 2, title: "Nextcloud",      description: "This is for testing. And this is more text."},
        {unique_id: 3, title: "Video Games",    description: "This is for testing. And this is more text.", vid_src: "/videos/Games.mp4"},
        {unique_id: 4, title: "3D Models",      description: "This is for testing. And this is more text."},
        {unique_id: 5, title: "Advent of code", description: "This is for testing. And this is more text."},
        {unique_id: 6, title: "Websites",       description: "This is for testing. And this is more text."}
    ]
    const initial_size = cards_content.length
</script>

<article class="m-auto px-6 md:px-16 bg-white text-2xl text-justify pt-6 pb-12">
    <header class="text-center pt-8 pb-8">
        <h1>Toni Martí Albons</h1>
        <p class="text-3xl text-gray-600">Multi-Disciplined Developer</p>
    </header>
    
    <hr class="mb-8 w-7/8 rounded m-auto h-0.5 bg-black"/>
    
    <p>Hi! This is a little website I made to show some of the things I've worked on during my spare time or in a university class.</p>
    
    <div class="bg-red-600 mt-4 text-center text-white py-2 font-black border-8 border-black"> THIS WEBSITE IS CURRENTLY UNDER DEVELOPMENT</div>
    
    <section class="pt-8">
        <h2>Projects</h2>
        
        {#if viewing_id}
            <button onclick={()=>viewing_id=0} class="fixed h-screen w-screen inset-0">
                <div in:receive={{key : viewing_id}} out:send={{key : viewing_id}}
                class="border-4 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white w-max">
                <h3 in:receive={{key : 'T'+viewing_id}} out:send={{key : 'T'+viewing_id}} class="inline">{cards_content[viewing_id-1].title}</h3>
                </div>    
            </button>
        {/if}
            
        {#each cards_content.filter((e)=>e.unique_id !== viewing_id) as content (content.unique_id)}
            <div transition:slide={{duration: 250}}>
                <button in:receive={{key:content.unique_id}} out:send={{key:content.unique_id}} onclick={()=>viewing_id = content.unique_id} class="border-4 border-black m-2 p-2 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white block w-full text-left">
                    {#if content.img}
                        <img src={content.img.src} alt={content.img.alt}/>
                    {/if}
                    
                    {#if content.vid_src}
                        <video src={content.vid_src} autoplay loop muted class="h-40 inline-block border"></video>
                    {/if}
                    <h3 in:receive={{key:'T'+content.unique_id}} out:send={{key:'T'+content.unique_id}} class="inline-block">{content.title}</h3>
                    <p>{content.description}</p>
                </button>
            </div>
        {/each}
</section>
                
    <section class="pt-8">
        <h2>Technologies I've used</h2>
        <ul>
            <li>
                Languages
                <ul>
                    <li>Python</li>
                    <li>Java</li>
                    <li>GDScript</li>
                    <li>C</li>
                    <li>C++</li>
                    <li>JavaScript & TypeScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                </ul>
            </li>
            <li>
            Databases
            <ul>
                <li>Oracle DB</li>
                <li>ElasticSearch</li>
                <li>MongoDB</li>
            </ul>
            </li>
            <li>
                Other Tools
                <ul>
                    <li>Git & GitHub</li>
                    <li>Jira</li>
                    <li>Godot</li>
                    <li>Unity</li>
                    <li>Oracle Apex</li>
                    <li>React</li>
                    <li>Svelte</li>
                    <li>Tailwind</li>
                </ul>
            </li>
        </ul>
    </section>
</article>
    
<footer class="m-auto px-6 max-w-4xl flex flex-wrap flex-auto min-w-full text-lg bg-gray-950 text-white text-center py-4">
    <div class="px-4 py-4 mx-auto">
        <strong class="underline block">Links of interest</strong>
        <a href="https://nextcloud.tonimartal.com/index.php/s/wcCzsLwdKkbZtnK/download/CV-ToniMartiAlbons.pdf" class="hover:underline block" download>
            Download my CV 
        </a>
        <a href="https://github.com/Toni-Marti/portfolio-website" class="hover:underline block" target="_blank">
            This website's source code 
        </a>        
    </div>
    <div class="px-4 py-4 mx-auto">
        <strong class="underline block">Contact me</strong>
        <a href="mailto:toni.m.a.2003@gmail.com" class="hover:underline block">
            <img src="/svgs/icons/email.svg" class="h-4 inline" alt="Email's Icon"/>    
            toni.m.a.2003@gmail.com
        </a>
        <a href="https://wa.me/34620357071" class="hover:underline block" target="_blank"><img src="/svgs/icons/whatsapp.svg" class="h-4 inline " alt="WhatsApp' Icon"/> WhatsApp</a>
        <a href="https://t.me/toni_marti_albons" class="hover:underline block" target="_blank"><img src="/svgs/icons/telegram.svg" class="h-4 inline" alt="Telegram's Icon"/> Telegram</a>
    </div>
</footer>

<svelte:window onwheel={()=>viewing_id=0} onscroll={()=>viewing_id=0}/>