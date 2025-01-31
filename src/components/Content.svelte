<script lang="ts">
  import type { ProjectInfo } from "$lib/types";
  import { slide, crossfade, scale, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { cards_content } from "$lib/cards_content";
  import { typewriter, appear } from "$lib/my_transitions";
  import { zero_width_char } from "$lib/constants";
  import { lockscroll } from "@svelte-put/lockscroll";
  import { bounceOut } from "svelte/easing";
  let card_display_classes = "max-h-40 border-2 rounded-xl m-auto";

  const transition_duration = 300;
  const typewriter_speed = 25;
  const [send, receive] = crossfade({
    duration: transition_duration,
    fallback: scale,
  });

  let viewing_index: number | null = $state(null);

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
    (looks at ccurrent description). It doesn't count the first sentence.
  */
  function charactersBefore(di: number): number {
    let total = currentDescription()[0].split(".").slice(1).join(".").length;
    for (let i = 1; i < di; i++) {
      total += currentDescription()[i].length;
      if (currentDescription()[i][0] === "-") {
        total -= 2;
      }
    }
    return total;
  }
  $inspect(viewing_index, currentInfo());
</script>

<!--
Used inside Project cards when they are being shown.

Parameters:
  mi: number - The index of the card being shown.
  line: string - The line to be shown.
-->
{#snippet typing_line(mi: number, line: string)}
  <span
    in:typewriter|global={{
      speed: typewriter_speed,
      character_delay:
        currentDescription()[0].split(".").slice(1).join(".").length +
        currentDescription()
          .slice(1)
          .slice(0, mi - 1)
          .join("").length,
    }}
  >
    {line + zero_width_char}
  </span>
{/snippet}

<article class="m-auto px-6 md:px-16 bg-white text-2xl text-justify pt-6 pb-12">
  <header class="text-center pt-8 pb-8">
    <h1>Toni Martí Albons</h1>
    <p class="text-3xl text-gray-600">Multi-Disciplined Developer</p>
  </header>

  <hr class="mb-8 w-7/8 rounded m-auto h-0.5 bg-black" />

  <p>
    Hi! This is a little website I made to show some of the things I've worked
    on during my spare time or in a university class.
  </p>

  <div
    class="bg-red-600 mt-4 text-center text-white py-2 font-black border-8 border-black"
  >
    THIS WEBSITE IS CURRENTLY UNDER DEVELOPMENT
  </div>

  <section class="pt-8">
    <h2 class="pb-2">Projects</h2>

    <!--
     ████ █   █  ███  █ █ █ █████ █   █  ███        ████  ████   ███   ████ █████  ████ █████
    █     █   █ █   █ █ █ █   █   ██  █ █           █   █ █   █ █   █    █  █     █       █  
     ███  █████ █   █ █ █ █   █   █ █ █ █  ██       ████  ████  █   █    █  ████  █       █  
        █ █   █ █   █ █ █ █   █   █  ██ █   █       █     █ █   █   █ █  █  █     █       █  
    ████  █   █  ███   █ █  █████ █   █  ███        █     █  █   ███   ██   █████  ████   █ 
    -->
    {#if viewing_index !== null}
      <div
        in:fade={{ duration: transition_duration }}
        out:fade={{ duration: transition_duration }}
        class="fixed h-screen w-screen inset-0 bg-[#00000080] backdrop-blur-sm z-10"
      ></div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        onclick={() => (viewing_index = null)}
        class="fixed h-screen w-screen inset-0 z-20 content-center text-center"
      >
        <div
          onclick={(e) => e.stopPropagation()}
          in:receive={{ key: viewing_index }}
          out:send={{ key: viewing_index }}
          class="border-2 border-white p-10 bg-gradient-to-br relative from-slate-950
        to-slate-900 inline-block rounded-2xl text-white text-left
        w-fit h-fit m-[2rem] max-w-[calc(min(100%-2rem,60rem))] max-h-[calc(100%-4rem)] overflow-y-auto text-clip"
        >
          <button
            onclick={() => (viewing_index = null)}
            class="cursor-pointer absolute top-4 right-5 hover:rotate-180 duration-300 transition ease-[cubic-bezier(1,1.93,.75,.57)]"
          >
            <img src="/svgs/icons/cross.svg" alt="Cross" class="h-6" />
          </button>
          <h3
            in:receive={{ key: "T" + viewing_index }}
            out:send={{ key: "T" + viewing_index }}
            class="text-center text-3xl"
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

            <span in:typewriter={{ speed: typewriter_speed }}>
              {currentDescription()[0].split(".").slice(1).join(".")}
            </span>
          </p>
          {#each currentDescription().slice(1) as line}
            {#if line[0] === "-"}
              <ul class="ms-8 list-outside list-disc">
                <li
                  in:appear|global={{
                    delay:
                      (100 *
                        charactersBefore(currentDescription().indexOf(line))) /
                      typewriter_speed,
                  }}
                  class="relative"
                >
                  {@render typing_line(
                    currentDescription().indexOf(line),
                    line.slice(2),
                  )}
                </li>
              </ul>
            {:else}
              {@render typing_line(
                currentDescription().indexOf(line),
                line.slice(2),
              )}
            {/if}
            <div></div>
          {/each}
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
        <div
          transition:slide={{ duration: transition_duration }}
          animate:flip={{ duration: transition_duration }}
          class={content.img || content.vid_src
            ? "lg:flex-[1_0_0] md:flex-[1_0_40%] flex-[1_0_100%]"
            : "w-full"}
        >
          <button
            in:receive={{ key: cards_content.indexOf(content) }}
            out:send={{ key: cards_content.indexOf(content) }}
            onclick={() => (viewing_index = cards_content.indexOf(content))}
            class="cursor-pointer p-3 pb-0 bg-gradient-to-br from-slate-950 to-slate-900 rounded-lg h-full w-full text-white text-left"
          >
            <div class="pb-2">
              <p
                in:receive={{ key: "P" + cards_content.indexOf(content) }}
                out:send={{ key: "P" + cards_content.indexOf(content) }}
                class="inline"
              >
                <strong
                  in:receive={{ key: "T" + cards_content.indexOf(content) }}
                  out:send={{ key: "T" + cards_content.indexOf(content) }}
                  class="inline-block"
                >
                  {content.title}
                </strong>
                - {content.description[0].split(".", 1)}.
              </p>
            </div>

            {#if content.img}
              <img
                in:receive={{ key: "I" + cards_content.indexOf(content) }}
                out:send={{ key: "I" + cards_content.indexOf(content) }}
                src={content.img.src}
                alt={content.img.alt}
                class="{card_display_classes} mb-3"
              />
            {/if}

            {#if content.vid_src}
              <video
                in:receive={{ key: "V" + cards_content.indexOf(content) }}
                out:send={{ key: "V" + cards_content.indexOf(content) }}
                src={content.vid_src}
                autoplay
                loop
                muted
                class="{card_display_classes} mb-3"
              ></video>
            {/if}
          </button>
        </div>
      {/each}
    </div>
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

<footer
  class="m-auto px-6 max-w-4xl flex flex-wrap flex-auto min-w-full text-lg bg-slate-950 text-white text-center py-4"
>
  <div class="px-4 py-4 m-auto">
    <strong class="underline block">Links of interest</strong>
    <a
      href="https://nextcloud.tonimartal.com/index.php/s/wcCzsLwdKkbZtnK/download/CV-ToniMartiAlbons.pdf"
      class="hover:underline block"
      download
    >
      Download my CV
    </a>
    <a
      href="https://github.com/Toni-Marti/portfolio-website"
      class="hover:underline block"
      target="_blank"
    >
      This website's source code
    </a>
  </div>
  <div class="px-4 py-4 m-auto">
    <strong class="underline block">Contact me</strong>
    <a href="mailto:toni.m.a.2003@gmail.com" class="hover:underline block">
      <img src="/svgs/icons/email.svg" class="h-4 inline" alt="Email's Icon" />
      toni.m.a.2003@gmail.com
    </a>
    <a
      href="https://wa.me/34620357071"
      class="hover:underline block"
      target="_blank"
      ><img
        src="/svgs/icons/whatsapp.svg"
        class="h-4 inline"
        alt="WhatsApp' Icon"
      /> WhatsApp</a
    >
    <a
      href="https://t.me/toni_marti_albons"
      class="hover:underline block"
      target="_blank"
      ><img
        src="/svgs/icons/telegram.svg"
        class="h-4 inline"
        alt="Telegram's Icon"
      /> Telegram</a
    >
  </div>
</footer>

<svelte:window />
<svelte:body use:lockscroll={viewing_index !== null} />
