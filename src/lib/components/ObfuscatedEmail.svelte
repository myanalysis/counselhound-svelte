<script lang="ts">
  let { email, class: cls = '' }: { email: string; class?: string } = $props();

  // Encode each character as an HTML entity — renders in browsers, invisible to scrapers
  const encoded = email.split('').map(c => `&#${c.charCodeAt(0)};`).join('');
  const encodedHref = ('mailto:' + email).split('').map(c => `&#${c.charCodeAt(0)};`).join('');
</script>

<a href={encodedHref} class={cls}>{@html encoded}</a>
