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
==========

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

```html
<a class="filterTable"></a>
```

**Имя элемента отделяется от имени блока одним минусом** **"-"**

```html
<a class="filterTable">
  <span class="filterTable-span"></span>
</a>
```

**Имя модификатора отделяется от имени блока или элемента одним подчеркиванием** **"_"**

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

```html
<a class="link is-hidden"></a>
```
=============
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
- Модицикации добавляются через присвоение дополнительного класса с модификатором.
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
========================
### Организация CSS кода

- Для работы над проектом используется препроцессор SASS (в SASS и SCSS синтаксисе).
- Стили задаются только через исходные файлы, с последующей компиляцией в CSS.
- Использование **!important** допускается только в случае переопределения стилей сторонних библиотек, если другого способа нет. 
- Рекомендуется использовать максимум 2 уровня вложенности.
- Обязательно использование переменных для присвоения общих значений (цвет, шрифт и т.д.).

```css
.section .block .link {
 font-size:1.5em;
 font-weight: 300;
}
```
**Структура кода**
Для повышения читаемости кода и навигации по нему, при написании кода следует придерживаться следующей структуры:

 1. Стили блока
  2. Псевдоклассы блока (hover, focus...)
  3. Псевдоклассы блока (after, before)
  4. Стиль дочернего элемента
 5. Модификация блока

*SCSS*
```scss
.block {
 font-size:1.5em;
 font-weight: 300;
 .block:hover {
   font-size:2.5em;
  }
 .block:before {
   content: '';
   width: 3px;
  }
 .element {
   font-size:1.5em;
   font-weight: 300;
  }
}

/*модификатор*/
.block_primary {
 font-size:1.5em;
 font-weight: 300;
 .block_primary:hover {
   font-size:0.5em;
  }
 .block_primary:before {
   content: '';
   width: 3px;
  }
 .block-element {
   color: red;
  }
}
```
*SASS*
```sass
.block
 font-size:1.5em
 font-weight: 300
 &:hover
   font-size:2.5em
 &:before
   content: ''
   width: 3px
 &-element
   font-size:1.5em
   font-weight: 300

/*модификатор*/
.block_mod
 font-size:1.5em
 font-weight: 300
 &:hover
   font-size:2.5em
 &:before
   content: ''
   width: 3px
 &-element
   font-size:1.5em
   font-weight: 300
```
=================

**Медиа-запросы**

Для корректной работы медиа-запросов необходимо добавить строку кода в head.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```
Медиа-запросы пишутся от большего к меньшему.
```css
@media screen and (max-width: 768px){

}
```

