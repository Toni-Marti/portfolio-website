<script lang="ts">
  import { slide, crossfade, scale, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { lockscroll } from "@svelte-put/lockscroll";
  import { cards_content } from "$lib/cards_content";
  import { typewriter, appear } from "$lib/my_transitions";
  import { zero_width_char } from "$lib/constants";
  import Videos from "./Videos.svelte";
  import type { ProjectInfo } from "$lib/types";

  const transition_duration = 300;
  const typewriter_base_speed = 0.16;
  const [send, receive] = crossfade({
    duration: transition_duration,
    fallback: scale,
  });
  const list_style = "list-disc list-outside ms-8";
  const technologies_section = "break-inside-avoid-column mb-5";

  let viewing_index: number | null = $state(null);
  let has_clicked = $state(false);

  function setViewingIndex(new_i: number | null) {
    viewing_index = new_i;
    if (new_i !== null) {
      has_clicked = true;
    }
  }

  function currentInfo(): ProjectInfo | null {
    if (viewing_index !== null) {
      return cards_content[viewing_index];
    }
    return null;
  }
  function currentDescription(): Array<string> {
    if (viewing_index !== null) {
      return cards_content[viewing_index].description;
    }
    return [];
  }

  /*
    Returns the characters before the description segment of given index 
    (looks at current description). It doesn't count the first sentence.
  */
  function alreadyPrinted(di: number): number {
    if (di === 0) return 0;

    let total = currentDescription()[0].split(".").slice(1).join(".").length;
    for (let i = 1; i < di; i++) {
      total += currentDescription()[i].length;
      if (currentDescription()[i][0] === "-") {
        total -= 2;
      }
    }
    return total;
  }

  /*
    Returns the links found in the given text together with their position in such text.
    
    Parameters:
      text: string - The text to search for links.
  */
  function getLinks(text: string): Array<[string, number]> {
    const pattern = /(\S*\.\S+)/g;
    const results: Array<[string, number]> = [];
    let match;
    while ((match = pattern.exec(text)) !== null) {
      let link = match[1];
      let add = 0;
      if (link.endsWith(".")) {
        link = link.slice(0, -1);
      }
      if (link.startsWith(".")) {
        link = link.slice(0, 1);
        add = 1;
      }
      results.push([link, match.index + add]);
    }
    return results;
  }
</script>

<!--
Used inside Project cards when they are being shown.

Parameters:
  li: number - The index of the card being shown.
  line: string - Index of the line to be shown.
-->
{#snippet type_line(li: number, speed: number)}
  {console.log(speed)}
  {@const text = currentDescription()[li]}
  {@const links = getLinks(text)}

  {#each links as link}
    {@const link_i = links.indexOf(link)}
    {@const text_before_link =
      link_i === 0
        ? text.startsWith("-")
          ? text.slice(2, link[1])
          : text.slice(0, link[1])
        : text.slice(
            links[link_i - 1][1] + links[link_i - 1][0].length,
            link[1],
          )}
    {@const n_characters_before =
      link_i === 0
        ? 0
        : text.startsWith("-")
          ? text.slice(2, links[link_i - 1][1]).length +
            links[link_i - 1][0].length
          : text.slice(0, links[link_i - 1][1]).length +
            links[link_i - 1][0].length}
    <span
      in:typewriter|global={{
        speed: speed,
        character_delay: alreadyPrinted(li) + n_characters_before,
      }}
    >
      {text_before_link}
    </span>
    <a
      href="http://{link[0]}"
      target="_blank"
      class="hover:underline text-teal-500"
      in:typewriter|global={{
        speed: speed,
        character_delay:
          alreadyPrinted(li) + n_characters_before + text_before_link.length,
      }}
    >
      {link[0]}
    </a>
  {/each}

  {@const text_left =
    links.length === 0
      ? text.startsWith("-")
        ? text.slice(2)
        : text
      : text.slice(
          links[links.length - 1][1] + links[links.length - 1][0].length,
        )}
  <span
    in:typewriter|global={{
      speed: speed,
      character_delay: alreadyPrinted(li) + (text.length - text_left.length),
    }}
  >
    {text_left + zero_width_char}
  </span>
{/snippet}

<!--
Parameters:
  ci: number, the index of the cards whose video is being rendered
-->

<article class="m-auto px-6 md:px-16 bg-white text-2xl text-justify pt-6 pb-12">
  <header class="text-center pt-8 pb-8">
    <h1>Toni Martí Albons</h1>
    <p class="text-3xl text-gray-600">Multi-Disciplined Developer</p>
  </header>

  <hr class="mb-8 w-7/8 rounded m-auto h-0.5 bg-black" />

  <p>
    Hi! This is a little website I made to show some of the things I've worked
    on at university or during my spare time.
  </p>

  <section class="pt-4">
    <h2 class="pb-2">Projects</h2>
    <p class="py-2 text-center animate-bounce" hidden={has_clicked}>
      Click on a card to se more about the project.
    </p>

    <!--
     ████ █   █  ███  █ █ █ █████ █   █  ███        ████  ████   ███   ████ █████  ████ █████
    █     █   █ █   █ █ █ █   █   ██  █ █           █   █ █   █ █   █    █  █     █       █  
     ███  █████ █   █ █ █ █   █   █ █ █ █  ██       ████  ████  █   █    █  ████  █       █  
        █ █   █ █   █ █ █ █   █   █  ██ █   █       █     █ █   █   █ █  █  █     █       █  
    ████  █   █  ███   █ █  █████ █   █  ███        █     █  █   ███   ██   █████  ████   █ 
    -->
    {#if viewing_index !== null}
      {@const text_speed =
        typewriter_base_speed * alreadyPrinted(currentDescription().length)}
      <div
        in:fade={{ duration: transition_duration }}
        out:fade={{ duration: transition_duration }}
        class="fixed h-screen w-screen inset-0 bg-[#00000080] backdrop-blur-sm z-10"
      ></div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        onclick={() => setViewingIndex(null)}
        class="fixed h-screen w-screen inset-0 z-20 content-center text-center"
      >
        <div
          class="relative inline-block m-[2rem] max-w-[calc(min(100%-2rem,60rem))] max-h-[calc(100vh-4rem)]"
        >
          <div
            class="border-3 border-white px-10 py-6 md:py-8 md:px-14 bg-gradient-to-br from-slate-950
            to-slate-900 rounded-2xl text-white text-justify
             overflow-y-auto text-clip max-h-[calc(100vh-4rem)]"
            onclick={(e) => e.stopPropagation()}
            in:receive={{ key: viewing_index }}
            out:send={{ key: viewing_index }}
          >
            <button
              onclick={() => setViewingIndex(null)}
              class="cursor-pointer absolute top-3 right-3 rounded-[50%] md:top-5
              md:right-5 hover:rotate-180 duration-300 transition ease-[cubic-bezier(1,1.93,.75,.57)]"
            >
              <img src="/svgs/icons/cross.svg" alt="Cross" class="p-1 h-8" />
            </button>
            <h3
              in:receive={{ key: "T" + viewing_index }}
              out:send={{ key: "T" + viewing_index }}
              class="text-center pb-2 md:pb-4"
            >
              {currentInfo().title}
            </h3>

            <p>
              <span
                in:receive={{ key: "P" + viewing_index }}
                out:send={{ key: "P" + viewing_index }}
              >
                {currentDescription()[0].split(".", 1)[0]}.
              </span>

              <span in:typewriter={{ speed: text_speed }}>
                {currentDescription()[0].split(".").slice(1).join(".")}
              </span>
            </p>
            {#each currentDescription().slice(1) as line}
              {@const li = currentDescription().indexOf(line)}
              <div class="h-3"></div>
              {#if line[0] === "-"}
                <ul class="ms-6 md:ms-10 list-outside list-disc">
                  <li
                    in:appear|global={{
                      delay: (100 * alreadyPrinted(li)) / text_speed,
                    }}
                  >
                    {@render type_line(li, text_speed)}
                  </li>
                </ul>
              {:else}
                {@render type_line(li, text_speed)}
              {/if}
            {/each}
            {#if currentInfo().vid_srcs}
              {@const n_vid = currentInfo().vid_srcs.length}
              {@const grid_class =
                n_vid === 1
                  ? ""
                  : n_vid === 2
                    ? "md:grid-cols-2"
                    : "md:grid-cols-3"}
              <div
                class="grid mt-3 md:mt-4 border-2 border-white rounded-lg w-fit mx-auto
                {grid_class} overflow-clip bg-white"
              >
                {#each currentInfo()?.vid_srcs as src}
                  <video
                    {src}
                    class="max-h-[50vh]"
                    disablepictureinpicture
                    autoplay
                    loop
                    muted
                  ></video>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <!--
    ████  ████   ███   ████ █████  ████ █████        ████  ███  ████  ████   ████
    █   █ █   █ █   █    █  █     █       █         █     █   █ █   █ █   █ █    
    ████  ████  █   █    █  ████  █       █         █     █   █ ████  █   █  ███ 
    █     █ █   █   █ █  █  █     █       █         █     █████ █ █   █   █     █
    █     █  █   ███   ██   █████  ████   █          ████ █   █ █  █  ████  ████
    -->
    <div class="flex flex-wrap items-stretch gap-2">
      {#each cards_content.filter((e) => cards_content.indexOf(e) !== viewing_index) as content (cards_content.indexOf(content))}
        {@const ci = cards_content.indexOf(content)}
        <div
          transition:slide={{ duration: transition_duration }}
          animate:flip={{ duration: transition_duration }}
          class={content.vid_srcs
            ? "lg:flex-[1_0_0] md:flex-[1_0_40%] flex-[1_0_100%]"
            : "w-full"}
        >
          <button
            in:receive={{ key: cards_content.indexOf(content) }}
            out:send={{ key: cards_content.indexOf(content) }}
            onclick={() => setViewingIndex(cards_content.indexOf(content))}
            class="cursor-pointer overflow-clip px-3 pt-2 pb-0 bg-gradient-to-br
             from-slate-950 to-slate-900 rounded-lg h-full w-full text-white text-left"
          >
            <div class="pb-2">
              <p class="inline">
                <strong
                  in:receive={{ key: "T" + cards_content.indexOf(content) }}
                  out:send={{ key: "T" + cards_content.indexOf(content) }}
                  class="inline-block"
                >
                  {content.title}
                </strong>
                <span
                  in:receive={{ key: "P" + cards_content.indexOf(content) }}
                  out:send={{ key: "P" + cards_content.indexOf(content) }}
                >
                  - {content.description[0].split(".", 1)}.
                </span>
              </p>
            </div>

            {#if content.vid_srcs}
              <Videos srcs={content.vid_srcs} />
            {/if}
          </button>
        </div>
      {/each}
    </div>
  </section>

  <section class="pt-8">
    <h2>Technologies I've used</h2>
    <p>This are some of the things I can confidently work with:</p>

    <div class="columns-1 md:columns-2 text-left pt-1 px-8">
      <div class={technologies_section}>
        <h3>Programming Languages</h3>
        <ul class={list_style}>
          <li>Python</li>
          <li>C & C++</li>
          <li>JavaScript & TypeScript</li>
          <li>Java</li>
          <li>Ruby</li>
        </ul>
        <p>
          Languages really aren't a problem for me anymore. I'm quick to adapt
          to new ones.
        </p>
      </div>

      <div class={technologies_section}>
        <h3>Information Retrieval</h3>
        <ul class={list_style}>
          <li>Oracle DB</li>
          <li>MongoDB</li>
          <li>ElasticSearch</li>
        </ul>
      </div>

      <div class={technologies_section}>
        <h3>Web Development</h3>
        <ul class={list_style}>
          <li>React</li>
          <li>Svelte</li>
          <li>Tailwind</li>
        </ul>
      </div>

      <div class={technologies_section}>
        <h3>Organization</h3>
        <ul class={list_style}>
          <li>Git & GitHub</li>
          <li>Jira</li>
        </ul>
      </div>

      <div class={technologies_section}>
        <h3>Game Engines</h3>
        <ul class={list_style}>
          <li>Godot</li>
          <li>Unity</li>
        </ul>
      </div>

      <div class={technologies_section}>
        <h3>Others</h3>
        <ul class={list_style}>
          <li>Docker & Docker Desktop</li>
        </ul>
      </div>
    </div>
  </section>
</article>

<footer
  class="m-auto px-6 max-w-4xl flex flex-wrap flex-auto min-w-full text-lg
  bg-slate-950 text-white text-center py-4"
>
  <div class="px-4 py-4 m-auto">
    <strong class="underline block">Links of interest</strong>
    <a
      href="https://nextcloud.tonimartal.com/index.php/s/wcCzsLwdKkbZtnK/download/CV-ToniMartiAlbons.pdf"
      class="hover:underline block"
      download
    >
      <img
        src="/svgs/icons/document.svg"
        alt="Document Icon"
        class="h-4 inline relative bottom-0.5"
      /> Download my CV
    </a>
    <a
      href="https://github.com/Toni-Marti/portfolio-website"
      class="hover:underline block"
      target="_blank"
    >
      <img
        src="/svgs/icons/github.svg"
        alt="Github's Icon"
        class="h-4 inline relative bottom-0.5"
      /> This website's source code
    </a>
  </div>
  <div class="px-4 py-4 m-auto">
    <strong class="underline block">Contact me</strong>
    <a href="mailto:toni.m.a.2003@gmail.com" class="hover:underline block">
      <img
        src="/svgs/icons/email.svg"
        class="h-4 inline relative bottom-[1px]"
        alt="Email's Icon"
      />
      toni.m.a.2003@gmail.com
    </a>
    <a
      href="https://wa.me/34620357071"
      class="hover:underline block"
      target="_blank"
      ><img
        src="/svgs/icons/whatsapp.svg"
        alt="WhatsApp' Icon"
        class="h-4 inline relative bottom-0.5"
      /> WhatsApp</a
    >
    <a
      href="https://t.me/toni_marti_albons"
      class="hover:underline block"
      target="_blank"
      ><img
        src="/svgs/icons/telegram.svg"
        alt="Telegram's Icon"
        class="h-4 inline relative bottom-0.5"
      /> Telegram</a
    >
  </div>
</footer>
<div class="grid-cols-1"></div>
<div class="grid-cols-2"></div>
<div class="grid-cols-3"></div>

<svelte:body use:lockscroll={viewing_index !== null} />
