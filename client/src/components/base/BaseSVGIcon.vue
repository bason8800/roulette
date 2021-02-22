<template>
  <svg
    ref="svg"
    :viewBox="viewBox"
    :width="width"
    :height="height"
    :fill="fill"
    :stroke="stroke"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

import { parse } from 'postsvg';
import render from 'posthtml-render';

const cache = new Map();

export default defineComponent({
  name: 'BaseSVGIcon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
    stroke: {
      type: String,
      default: 'none',
    },
    generateReadyEvent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const svgString = ref('');
    const svg = ref<HTMLElement | null>(null);

    const filepath = computed(() =>
      require(`@/assets/svg/countries/${props.iconName}.svg`),
    );

    const parsedSVG = computed(() =>
      svgString.value ? parse(svgString.value) : null,
    );

    const viewBox = computed(() =>
      parsedSVG.value ? parsedSVG.value.root.attrs.viewBox : '0 0 20 20',
    );

    const getSvgIconText = async () => {
      const url = filepath.value;

      if (!cache.has(url)) {
        try {
          cache.set(
            url,
            fetch(url).then(r => r.text()),
          );
        } catch (e) {
          cache.delete(url);
        }
      }

      return cache.has(url)
        ? await cache.get(url)
        : Promise.reject(new Error('Нет SVG-файла в локальном кэше'));
    };

    const loadFile = async () => {
      try {
        svgString.value = await getSvgIconText();
      } catch (e) {
        console.error('Ошибка загрузки SVG-файла', e);
      }
    };

    const refreshSvg = async () => {
      try {
        const svgTree = await Promise.resolve(parsedSVG.value);

        svgTree.each('path', (node: any) => (node.attrs.fill = props.fill));

        const svgHtml = render(svgTree.root.content);

        if (svg.value) {
          svg.value.innerHTML = svgHtml;
        }

        if (props.generateReadyEvent) {
          ctx.emit('ready');
        }
      } catch (e) {
        console.error('Ошибка при обновлении SVG', e);
        ctx.emit('error', e);
      }
    };

    watch(svgString, refreshSvg);
    watch(filepath, loadFile, { immediate: true });
    watch(() => props.stroke, refreshSvg);
    watch(() => props.fill, refreshSvg);

    return {
      viewBox,
      svg,
    };
  },
});
</script>

<style>
svg {
  display: inline-block;
  margin-bottom: -2px;
  vertical-align: baseline;
  transition: fill 0.3s, stroke 0.3s;
}
</style>
