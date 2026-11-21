<template>
  <div :class="$style.page">
    <Navbar />

    <main :class="$style.main">
      <div :class="$style.wrap">
        <router-link :class="$style.back" to="/blog">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <path
              d="M19 12H5M11 6l-6 6 6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back to blog
        </router-link>

        <template v-if="article">
          <div :class="$style.head">
            <span :class="$style.readingTime">{{ article.readingTime }}</span>
            <h1 :class="$style.title">{{ article.title }}</h1>
            <p :class="$style.description">{{ article.description }}</p>
          </div>

          <div :class="$style.imageWrap">
            <img
              :class="$style.image"
              :src="article.image"
              :alt="article.imageAlt"
            />
          </div>

          <article :class="$style.body">
            <p v-for="(paragraph, index) in article.body" :key="index">
              {{ paragraph }}
            </p>
          </article>
        </template>

        <template v-else>
          <div :class="$style.notFound">
            <h1 :class="$style.title">Article not found</h1>
            <p :class="$style.description">
              The perspective you are looking for does not exist or has moved.
            </p>
            <router-link :class="$style.back" to="/blog">Back to blog</router-link>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import Navbar from "../components/Navbar.vue";
  import { getArticle } from "../data/articles";

  const route = useRoute();
  const slug = computed(() => String(route.params.slug ?? ""));
  const article = computed(() => getArticle(slug.value));
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
    gap: 24px;
    width: 100%;
    max-width: 672px;
    margin: 0 auto;
  }

  .back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    color: #0b5641;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
  }

  .back:hover {
    text-decoration: underline;
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .readingTime {
    color: #0b5641;
    font-size: 14px;
    font-weight: 500;
  }

  .title {
    margin: 0;
    color: #171717;
    font-size: 28px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.6px;
  }

  .description {
    margin: 0;
    color: #737373;
    font-size: 16px;
    line-height: 1.6;
  }

  .imageWrap {
    width: 100%;
    overflow: hidden;
    border-radius: 24px;
  }

  .image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #3f3f46;
    font-size: 16px;
    line-height: 1.7;
  }

  .body p {
    margin: 0;
  }

  .notFound {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  @media screen and (min-width: 640px) {
    .title {
      font-size: 32px;
    }
  }
</style>
