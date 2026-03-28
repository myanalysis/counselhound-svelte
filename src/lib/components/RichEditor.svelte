<script lang="ts">
  let { value = $bindable(''), id = 'content' }: { value: string; id?: string } = $props();

  let editor: HTMLDivElement;

  function exec(cmd: string, val?: string) {
    editor.focus();
    document.execCommand(cmd, false, val);
    sync();
  }

  function sync() {
    value = editor.innerHTML;
  }

  function setHeading(tag: string) {
    editor.focus();
    document.execCommand('formatBlock', false, tag);
    sync();
  }

  function setColor(color: string) {
    exec('foreColor', color);
  }

  const colors = ['#162d39', '#d8b269', '#e63946', '#2a9d8f', '#555555', '#000000'];

  const tools = [
    { label: 'B',     title: 'Bold',          action: () => exec('bold'),          class: 'font-black' },
    { label: 'I',     title: 'Italic',         action: () => exec('italic'),         class: 'italic' },
    { label: 'U',     title: 'Underline',      action: () => exec('underline'),      class: 'underline' },
    { label: 'UL',    title: 'Bullet list',    action: () => exec('insertUnorderedList'), class: '' },
    { label: 'OL',    title: 'Numbered list',  action: () => exec('insertOrderedList'),   class: '' },
    { label: 'H2',    title: 'Heading 2',      action: () => setHeading('h2'),       class: '' },
    { label: 'H3',    title: 'Heading 3',      action: () => setHeading('h3'),       class: '' },
    { label: 'P',     title: 'Paragraph',      action: () => setHeading('p'),        class: '' },
    { label: '—',     title: 'Divider',        action: () => exec('insertHorizontalRule'), class: '' },
    { label: 'Clear', title: 'Clear format',   action: () => exec('removeFormat'),   class: '' },
  ];

  // Init editor with existing value
  $effect(() => {
    if (editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  });
</script>

<!-- Hidden input to submit with form -->
<input type="hidden" name={id} {value} />

<!-- Toolbar -->
<div class="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border border-gray-200 border-b-0">
  {#each tools as t}
    <button
      type="button"
      title={t.title}
      onclick={t.action}
      class="px-2 py-1 text-xs border border-gray-200 bg-white hover:bg-gray-100 transition-colors {t.class}"
    >{t.label}</button>
  {/each}

  <!-- Color swatches -->
  <div class="flex items-center gap-1 ml-2 border-l border-gray-200 pl-2">
    {#each colors as c}
      <button
        type="button"
        title="Color"
        onclick={() => setColor(c)}
        class="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform"
        style="background:{c};"
      ></button>
    {/each}
  </div>
</div>

<!-- Editable area -->
<div
  bind:this={editor}
  contenteditable="true"
  oninput={sync}
  class="min-h-64 px-4 py-3 text-sm border border-gray-200 outline-none focus:border-[#162d39] transition-colors bg-white prose prose-sm max-w-none"
  style="line-height: 1.7;"
></div>
