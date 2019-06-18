# Дизайн-система для сайта 63pokupki.ru



## Введение
  Данная система разработана для организации и **облегчения** работы верстальщиков и frontend-разработчиков над проектом "SP". 
  С её помощью можно достичь максимального уровня чистоты верстки и CSS-стилей, что значительно облегчит разработку и поддержку   проекта.


## Содержание

-  [Нейминг](http://webdesign.ru.net)
-  [Стилизация](http://webdesign.ru.net)
-  [Внедрение новых элементов](http://webdesign.ru.net)
-  [Как пользоваться дизайн-системой](http://webdesign.ru.net)
-  [Работа с svg-спрайтом](http://webdesign.ru.net)
-  [Страница элементов](http://webdesign.ru.net)

## Нейминг 
  Для нейминга исползуется принцип [БЭМ](https://ru.bem.info/methodology/quick-start/#%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5), согласно которому интерфейс разбивается на независимые блоки. Разработчики договорились использовать такой подход, когда блок явно будет использоваться в проекте неоднократно.

**Название блока и элемента должно характеризовать его смысл, а не внешний вид.**

Правильно:
```html
<a class="btn"></a>
```
Неправильно:
```html
<a class="blue"></a>
```

**Имя блока задаёт пространство имен содержащихся внутри него элементов.**


**При написании составных имен, используем стиль** **[lowerCamelCase](https://ru.wikipedia.org/wiki/CamelCase)**.

Пример:
```html
<a class="filterTable"></a>
```

**Имя элемента отделяется от имени блока одним минусом** **"-"**

Пример:
```html
<a class="filterTable">
  <span class="filterTable-span"></span>
</a>
```

**Имя модификатора отделяется от имени блока или элемента одним подчеркиванием** **"_"**

Пример:
```html
<a class="filterTable">
  <span class="filterTable-span filterTable-span_primary"></span>
</a>
```
**Пример вложенности элементов внутри блока**

Правильно:
```html
<a class="filterTable">
  <span class="filterTable-span">
    <img class="filterTable-image">
  </span>
</a>
```
Неправильно:
```html
<a class="filterTable">
  <span class="filterTable-span">
    <img class="filterTable-span-image">
  </span>
</a>
```

**Состояние задаётся через добавление класса с префиксом "is-"**

Пример:
```html
<a class="link is-hidden"></a>
```
## Стилизация
### Основные правила
- В проекте не допускается использование селекторов тегов и идентификаторов для стилизации. Это может создать трудности в модифицировании элемента.
- Для каждого элемента должен быть задан класс, даже если к нему не применяются стили (заботимся о будущем).

Правильно:
```css
.h1 {
 font-size:1.5em;
 font-weight: 300;
}
```
Неправильно:
```css
h1 {
 font-size:1.5em;
 font-weight: 300;
}
```
Очень неправильно:
```css
h1.h1 {
 font-size:1.5em;
 font-weight: 300;
}
```
- Позиционирование элемента задаётся через присвоение класса в пределах имени родительского пространства.
```html
<a class="filterTable">
  <span class="span filterTable-span"></span>
  <a class="link filterTable-link"></a>
</a>
```
```css
.link {
 font-size:1.5em;
 font-weight: 300;
}
.filterTable-link {
 margin: 1.5em;
}
```
- Модицикации добавляются через присвоение доплонительного класса с модификатором: 
```html
<a class="filterTable">
  <a class="link link_secondary filterTable-link"></a>
</a>
```
```css
.link {
 font-size:1.5em;
 font-weight: 300;
}
.link_secondary {
  color: red;
}
```
