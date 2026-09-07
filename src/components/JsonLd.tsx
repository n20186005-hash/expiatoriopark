// 轻量 JSON-LD 注入组件（SEO 结构化数据）
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  // 防止 JSON 内的 `</script>` 之类片段破坏标签
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
