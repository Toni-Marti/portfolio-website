<script>
    import FooterElement from '../components/FooterElement.svelte';
</script>

<title>Toni's portfolio</title>

<article class="m-auto px-6 md:px-16 max-w-4xl bg-white min-h-screen text-2xl text-justify pt-6 pb-12">
    <header>
        <h1>Toni Martí Albons</h1>
        <p>Multi-Disciplined Developer</p>
    </header>
    
    <hr class="mb-8 w-7/8 rounded m-auto h-0.5 bg-black"/>
    
    <p>Hi! This is a little website I made to show some of the things I've worked on during my spare time or in a university class.</p>

    <div class="bg-red-600 mt-4 text-center text-white py-2 font-black border-8 border-black"> THIS WEBSITE IS CURRENTLY UNDER DEVELOPMENT</div>
    
    <section>
        <h2>Projects</h2>
        
        <ul>
            <li>AI Models</li>
            <li>Nextcloud</li>
            <li>Video Games</li>
            <li>Advent of code</li>
            <li>Websites</li>
        </ul>
    </section>
    
    <section>
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
    
<footer class="m-auto px-6 max-w-4xl flex flex-wrap items-center">
    <FooterElement>
        <strong>Links of interest</strong>
        <a href="https://nextcloud.tonimartal.com/index.php/s/wcCzsLwdKkbZtnK/download/CV-ToniMartiAlbons.pdf" download>
            Download my CV 
        </a>
        <a href="https://github.com/Toni-Marti/portfolio-website" target="_blank">
            This website's source code 
        </a>        
    </FooterElement>
    <FooterElement>
        <strong>Contact me</strong>
        <a href="mailto:toni.m.a.2003@gmail.com">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={2.5} stroke="currentColor" class="h-4 inline">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            toni.m.a.2003@gmail.com
        </a>
        <a href="https://wa.me/34620357071" target="_blank"><img src="/icons/whatsapp-logo.png" class="h-4 inline"/> WhatsApp</a>
        <a href="https://t.me/toni_marti_albons" target="_blank"><img src="/icons/telegram-logo.png" class="h-4 inline"/> Telegram</a>
    </FooterElement>
</footer>
