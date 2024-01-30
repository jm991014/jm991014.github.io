---
layout: post
title: Jetpack Compose - Tutorial
category: [Android]
tag: [AOS, Jetpack Compose]
toc: true
---

<i class='fas fa-exclamation-circle' style='font-size:18px'></i> 해당 포스트는 Android [Jetpack Compose](https://developer.android.com/jetpack/compose?hl=ko) 공식문서 Tutorial을 따라하였습니다.

## Jetpack Compose

`Jetpack`은 쉽게 말해 구글에서 제공하는 라이브러리들의 모음이고, `Compose`는 기존에 View를 XML 파일로 작성하던 명령형 UI가 아닌 선언형 UI 개발을 가능하게 해주는 Framework이다. **코드 감소**, **직관적**, **빠른 개발 과정**, **강력한 성능**과 같은 장점이 있다고 하니 일단 project를 생성해보았다.

<p align="center">
    <img src="/public/post_assets/2024-01-24/new-project.png" width="80%" alt="Resized Image">
</p>

만들 수 있는 Compose Activity에는 Empty Compose Activity와 Empty Compose Activity(Material3)가 있는데, 블로그들을 참고하였을 때 대부분 아래 것을 사용하길래 무엇이 다른가 살펴보기 위해 두 가지 모두 프로젝트를 만들어 보았다.

app단의 `build.gradle`을 살펴보았을 때, 사용하는 Material version이 다른 것을 알 수 있는데, 차세대인 [Compose Material3](https://developer.android.com/jetpack/androidx/releases/compose-material3?hl=ko)로 프로젝트를 생성하였다.

<p align="center">
    <img src="/public/post_assets/2024-01-24/material.png" width="65%" alt="Resized Image">
</p>

<p align="center">
    <img src="/public/post_assets/2024-01-24/material3.png" width="80%" alt="Resized Image">
</p>

프로젝트를 처음 생성하고 나면 아래와 같이 기존 Android 프로젝트와 구조가 다른 것을 알 수 있다. 일단 튜토리얼대로 생성된 코드를 지워준 후, 하나씩 진행해보았다.

<p align="center">
    <img src="/public/post_assets/2024-01-24/project-first.png" width="100%" alt="Resized Image">
</p>

이제는 XMl 파일에 TextView를 생성하고, 해당 위젯이 있는 layout을 inflate하고,viewBinding이나 findViewById()로 연결하는 귀찮은 과정 없이 onCreate() 함수 안에
```Kotlin
setContent {
    Text("Hello World")
}
```
이 한줄만 추가해주면 완성이다.

<br>

## Composable functions

앞서 얘기했듯 Compose는 선언형 UI를 가능하게 해주는데, 이는 `상태`에 따라 UI 렌더링이 바뀌는 방식이다. Composable function을 만들기 위해서는 주석으로 `@Composable`를 추가해주면 된다.

```Kotlin
@Composable
fun MessageCard(name: String) {
    Text(text = "Hello $name!")
}
```

이제 완성한 함수를 `@Preview` 주석을 추가해주어 미리 볼 수 있다. 주의해야 할 점은 매개변수가 없는 Composable 함수에만 사용해야 한다는 것이다. 대신,
```Kotlin
@Preview
@Composable
fun PreviewMessageCard() {
    MessageCard("Android")
}
```
이와 같이 새로 함수를 하나 만들어서 Preview를 해볼 수 있다. 이 외에도 Preview 주석에 매개변수로 `showSystemUi = true`를 추가해 전체 기기 화면으로 볼 수도 있다.

```Kotlin
@Preview(showSystemUi = true, showBackground = true)
```

매개 변수로 추가를 해주면 전체적인 화면을 볼 수 있다.

<p align="center">
    <img src="/public/post_assets/2024-01-24/project-systemui.png" width="40%" alt="Resized Image">
</p>

<br>

## Layouts

해당 튜토리얼에서는 3가지 정렬 방식에 대해 설명한다.

1. Column: 요소를 수직으로 정렬
2. Row: 요소를 수평으로 정렬
3. Box: 요소를 쌓음 (align을 주게 되면 겹치지 않게도 가능하다)

각 정렬 방식을 적용해 보았을 때 결과는 아래와 같다:

|<img src="/public/post_assets/2024-01-24/column.png">|<img src="/public/post_assets/2024-01-24/row.png">|<img src="/public/post_assets/2024-01-24/box.png">|
|:---:|:---:|:---:|
|Column|Row|Box|

다시 돌아와 `Column`으로 `Text`를 정렬하고, 상위 레이아웃은 `Row`로 `Image`와 함께 감싸 정렬해준다. (이미지는 귀찮아서 프로젝트 생성시 주어지는 launcher icon을 사용했다.)
<p align="center">
    <img src="/public/post_assets/2024-01-24/image.png" width="70%" alt="Resized Image">
</p>

이미지가 Text에 비해 큰 느낌이 든다. 이럴 때 사용하는 것이 `Modifier`인데, 이를 통해 크기나 레이아웃, 모양을 변경할 수 있으며, 클릭과 같은 상호작용 또한 추가할 수 있다.
```Kotlin
Row(modifier = Modifier.padding(all = 8.dp)) {
        Image(
            painter = painterResource(R.drawable.ic_launcher_foreground),
            contentDescription = "Contact profile picture",
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Column {
            Text(text = msg.author)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = msg.body)
        }
    }
```

<p align="center">
    <img src="/public/post_assets/2024-01-24/modifier.png" width="70%" alt="Resized Image">
</p>

<br>

## Material Design

Compose는 Material Design을 지원한다. 프로젝트에 Theme을 적용하여 전체적인 앱에 일관성을 갖게 해보자. `Theme.kt`에 내 프로젝트 이름의 기본 Theme이 생성되어 있다. 
setContent 내부에 아래와 같이 Theme과 Surface로 MessageCard를 감싸준다.

```Kotlin
JetpackComposeTutorialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    MessageCard(Message("Android", "Jetpack Compose"))
                }
            }   
```

이제 핵심 요소인 Color, Typography, Shape를 차례대로 적용해볼 차례다. 

### Color

앞서 적용한 Theme에 미리 지정된 색상으로 스타일을 바꿔볼 수 있다. MessageCard 함수 내에 Image의 Modifier 뒤에 아래와 같이 Color를 추가해준다.         
```Kotlin
fun MessageCard(msg: Message) {
    Row(modifier = Modifier.padding(all = 8.dp)) {
        Image(
            painter = painterResource(R.drawable.ic_launcher_foreground),
            contentDescription = "Contact profile picture",
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
                .border(1.5.dp, MaterialTheme.colorScheme.secondary, CircleShape)
        )
    // 중략
}
```

튜토리얼에는 color이라고 되어 있지만 Material3로 넘어오면서 `colorScheme`으로 변경되었다. 이후 typography도 그렇고 shape에서도 변경사항이 있다. [Compose의 Material 2에서 Material 3으로 이전](https://developer.android.com/jetpack/compose/designsystems/material2-material3?hl=ko)을 참고하여 변경된 부분을 수정해주었다.
<p align="center">
    <img src="/public/post_assets/2024-01-24/material-color.png" width="100%" alt="Resized Image">
</p>

### Typography

마찬가지로 변경된 Typescale을 참고하여 MessageCard 함수 내 Text에 typography를 추가해준다.

<p align="center">
    <img src="/public/post_assets/2024-01-24/material-typescale.png" width="100%" alt="Resized Image">
</p>

```Kotlin
Column {
    Text(
        text = msg.author,
        color = MaterialTheme.colorScheme.secondary,
        style = MaterialTheme.typography.titleSmall
    )
    Spacer(modifier = Modifier.height(4.dp))
    Text(
        text = msg.body,
        style = MaterialTheme.typography.bodyMedium
    )
}
```

### Shape

마지막으로 메시지의 body를 담당하는 Text에 shape를 추가해준다.
```Kotlin
Surface(
    shape = MaterialTheme.shapes.medium,
    shadowElevation = 1.dp,
) {
    Text(
        text = msg.body,
        modifier = Modifier.padding(all = 4.dp),
        maxLines = if (isExpanded) Int.MAX_VALUE else 1,
        style = MaterialTheme.typography.bodyMedium
    )
}
```
여기서도 elevation 대신 shadowElevation, tonalElevation을 사용하게 되는데, 아래와 같은 특징이 있다:

1. `shadowElevation`: 값이 증가할수록 도형 주변의 shadow가 짙어진다.
2. `tonalElevation`: 값이 증가할수록 도형의 색조가 짙어진다.

`@Preview`주석에 매개변수로 다크 테마도 적용해볼 수 있는데, 지금까지 작성한 코드의 결과물을 각각 라이트, 다크 모드로 볼 수 있다.
```Kotlin
@Preview(name = "Light Mode")                 // Light
@Preview(                                     // Dark
    uiMode = Configuration.UI_MODE_NIGHT_YES,
    showBackground = true,
    name = "Dark Mode"
)
```

<p align="center">
    <img src="/public/post_assets/2024-01-24/material-final.png" width="60%" alt="Resized Image">
</p>

<br>

## Lists & Animations

### Lists

이번에는 Compose의 `LazeColumn`을 사용해 메시지가 하나가 아닌 여러개로 나타내보자. 이는 RecyclerView처럼 **화면에 표시되는** 항목만 렌더링하여 효율적이다. <br> 우선 튜토리얼에서 제공하는 샘플 데이터를 받아서 SampleData.kt에 저장한다. 이후 List를 매개변수로 받는 `items`의 람다식을 List의 각 항목마다 호출한다. 이 때 매개변수가 없는 새로운 Composable 함수를 만들어 결과를 확인해보자.

```Kotlin
@Composable
fun Conversation(messages: List<Message>) {
    LazyColumn {
        items(messages) { message ->
            MessageCard(message)
        }
    }
}
@Preview
@Composable
fun PreviewConversation() {
    JetpackComposeTutorialTheme {
        Conversation(SampleData.conversationSample)
    }
}
```

<p align="center">
    <img src="/public/post_assets/2024-01-24/list.png" width="40%" alt="Resized Image">
</p>

### Animations

애니메이션을 적용하기 위해 UI의 `상태`를 `remember`와 `mutableStateOf` 함수를 사용해서 메모리에 저장하고 그 변경사항을 추적할 수 있다. 변경사항이 생길 경우 UI가 다시 그려지는데, 이를 `재구성`이라고 한다. Modifier에 **clickable**을 추가하고 **isExpanded** 변수로 메시지가 확장되었는지 그 상태를 추적한다. 이 때 변경사항에 따라 **maxLines**의 값을 변경해줌으로써 메시지 상자가 확장되는 것을 알 수 있다.

```Kotlin
@Composable
fun MessageCard(msg: Message) {
    Row(modifier = Modifier.padding(all = 8.dp)) {
    /// ...
        var isExpanded by remember { mutableStateOf(false) }
        Column(modifier = Modifier.clickable { isExpanded = !isExpanded }) {
            /// ...
            Text(
                    text = msg.body,
                    modifier = Modifier.padding(all = 4.dp),
                    maxLines = if (isExpanded) Int.MAX_VALUE else 1,
                    style = MaterialTheme.typography.bodyMedium
                )
            /// ...
        }
    }
}
```

애니메이션은 배경색에도 적용할 수 있다. `animateColorAsState` 함수로 상태에 따라 색을 변경해줄 수 있고, `animateContentSize` modifier로 메시지 컨테이너의 크기를 더욱 부드럽게 해줄 수 있다. <br>

|<img src="/public/post_assets/2024-01-24/final-anim.gif">|<img src="/public/post_assets/2024-01-24/final-noanim.gif">|
|:---:|:---:|
|애니메이션 o|애니메이션 x|

애니메이션을 적용하기 전에 비해 적용한 후가 훨씬 부드러워진 것을 알 수 있다.

<br>

## 정리

아직은 View가 복잡한 앱을 만든 것이 아니라 이후에 어떻게 느낄 지는 모르겠지만 확실히 코드 파일과 XML 파일을 오가며 작업할 필요가 없어져 피로도가 덜 한 것 같다. 코드 또한 많이 줄었다는 느낌을 받았는데, recyclerView와 같이 xml을 작성하고 adapter를 만들어서 연결해주는 복잡한 과정이 줄었다는 것 만으로도 충분히 메리트가 있는 것 같다. 더 사용해보고 자세한 후기를 남겨보도록 하겠다.