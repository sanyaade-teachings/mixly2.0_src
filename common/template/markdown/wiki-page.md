---
title: {{d.title}}
order: {{d.order}}
index: {{d.index}}
---

{{#  layui.each(d.blocks, function (index, item) { }}

::: tabs#example

@tab 图形化#blocks

<img src="{{item.imgPath}}" alt="模块" style="zoom:10%;" />

@tab 代码#code

```arduino
{{item.code}}
```

:::

{{# }); }}

{{#  if(d.blocks.length === 0) { }}

<Catalog />

{{# } }}