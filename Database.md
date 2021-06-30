# Database :

Nom : **database.db**
## Table

Warn table

| warn    | Type         |
|:-------:|:------------:|
| id      | Int Primary  |
| userId  | Vachar (255) |
| nb_warn | Int          |
| reason  | Text         |

Roles table pour l'auto role

| role      | Type         |
|:---------:|:------------:|
| id        | Int Primary  |
| messageId | Vachar (255) |
| channelId | Vachar (255) |
| emoji     | Vachar (255) |
| role      | Vachar (255) |
| mode      | Text         |

Words Banned table pour l'auto modération 

| wordBanned | Type         |
|:----------:|:------------:|
| id         | Int Primary  |
| word       | Vachar (255) |
| userId     | Int          |

Bump table pour le compteur de bump

| bump      | Type         |
|:---------:|:------------:|
| id        | Int Primary  |
| userId    | Vachar (255) |
| date      | Text         |

Channels table pour les setChannels

| channels  | Type         |
|:---------:|:------------:|
| id        | Int Primary  |
| name      | Vachar (255) |
| channelId | Vachar (255) |

Stats table pour le commande Stats

| stats     | Type         |
|:---------:|:------------:|
| id        | Int Primary  |
| year      | Vachar (255) |
| month     | Vachar (255) |
| joine     | Int          |
| leave     | Int          |



| messages  | Type         |
|:---------:|:------------:|
| id        | Int Primary  |
| message   | Vachar (255) |
| messageID | Vachar (255) |
| channel   | Vachar (255) |
| author    | Vachar (255) |
| timestamp | Vachar (255) |

| invalidName | Type         |
|:-----------:|:------------:|
| id          | Int Primary  |
| userName    | Vachar (255) |
| userID      | Vachar (255) |
