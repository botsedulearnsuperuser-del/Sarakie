<template>
  <div :class="$style.page">
    <Navbar />

    <main :class="$style.main">
      <div :class="$style.wrap">
        <div :class="$style.head">
          <span :class="$style.badge">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden="true">
              <path
                d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7.5 18.5l-4 1 1-4L16.5 3.5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Perspectives &amp; Playbooks
          </span>

          <h1 :class="$style.title">Practical thinking for CEDA innovators</h1>

          <p :class="$style.description">
            Deep dives into submission strategy, evaluation and the workflows that move Botswana
            ideas from first draft to funding.
          </p>
        </div>

        <div :class="$style.list">
          <article v-for="post in posts" :key="post.title" :class="$style.card">
            <div :class="$style.cardBody">
              <span :class="$style.readingTime">{{ post.readingTime }}</span>
              <h2 :class="$style.cardTitle">{{ post.title }}</h2>
              <p :class="$style.cardText">{{ post.description }}</p>
              <router-link :class="$style.cardCta" :to="`/blog/${post.slug}`">
                Read more
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </router-link>
            </div>

            <div :class="$style.cardImageWrap">
              <img
                :class="$style.cardImage"
                :src="post.image"
                :alt="post.imageAlt"
                loading="lazy"
              />
            </div>
          </article>
        </div>

        <p :class="$style.note">New perspectives are published every month.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import Navbar from "../components/Navbar.vue";
  import { articles } from "../data/articles";

  const posts = articles;
</script>

<style module>
  .page {
    min-height: 100vh;
    background-color: #ffffff;
    font-family: var(--font-inter);
  }

  .main {
    width: 100%;
    padding: 32px 16px 72px;
    box-sizing: border-box;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    width: 100%;
    max-width: 672px;
    margin: 0 auto;
  }

  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border: 1px solid #e8e2d8;
    border-radius: 999px;
    background-color: #f7f2e9;
    color: #0b5641;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .title {
    max-width: 560px;
    margin: 0;
    color: #171717;
    font-size: 28px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.6px;
  }

  .description {
    max-width: 448px;
    margin: 0;
    color: #737373;
    font-size: 14px;
    line-height: 1.6;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .card {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow: hidden;
    border-radius: 32px;
  }

  .cardBody {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 8px;
    padding: 22px 22px 20px;
    border-radius: 32px;
    background-color: #f7f2e9;
    box-sizing: border-box;
  }

  .readingTime {
    color: #0b5641;
    font-size: 14px;
    font-weight: 500;
  }

  .cardTitle {
    margin: 0;
    color: #171717;
    font-size: 18px;
    line-height: 1.35;
    font-weight: 600;
  }

  .cardText {
    margin: 0;
    color: #737373;
    font-size: 14px;
    line-height: 1.55;
    text-wrap: pretty;
  }

  .cardCta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    align-self: flex-start;
    margin-top: auto;
    padding: 5px 10px;
    border: 1px solid #e6e0d3;
    border-radius: 32px;
    background-color: #ffffff;
    color: #171717;
    font-size: 14px;
    font-weight: 500;
  }

  .cardImageWrap {
    position: relative;
    width: 192px;
    flex-shrink: 0;
    border: 1px solid #e6e0d3;
    border-radius: 32px;
    overflow: hidden;
  }

  .cardImage {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 32px;
  }

  .note {
    margin: 0;
    padding-top: 4px;
    text-align: center;
    color: #9a9488;
    font-size: 13px;
  }

  @media screen and (min-width: 640px) {
    .title {
      font-size: 32px;
    }
  }

  @media screen and (min-width: 880px) {
    .title {
      font-size: 38px;
    }
    .wrap {
      gap: 56px;
    }
  }

  @media screen and (max-width: 640px) {
    .card {
      flex-direction: column-reverse;
    }
    .cardImageWrap {
      width: 100%;
      height: 200px;
    }
    .title {
      font-size: 26px;
    }
  }
</style>
