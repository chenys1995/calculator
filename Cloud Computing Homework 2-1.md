# Cloud Computing Homework 2-1
# CPU
## 1. vCPU, pCPU
![](https://imgur.com/hC91k9v.png)
![Figure 1](https://imgur.com/mwMf05w.png)
![Figure 2](https://imgur.com/zbdINY4.png)
![Figure 3](https://imgur.com/94IxnGU.png)
![Figure 4](https://imgur.com/piArRsh.png)
![](https://imgur.com/vSdxD3P.png)
可以看到，在執行時因為vCPU < CPU，所以1個vCPU都有對應到實體CPU上執行。 
## 2. 請解釋CPU ready time
vm準備好，但CPU還沒準備好，ready time就是算到cpu準備好的時間。
## 3. pi.c/raytracing		

### pi.c執行1000次的實驗數據
| VM1 | VM2 | Ready time | Execution time|
| --------  | -------- | -------- |-------|
| n/2=4     | n/2=4    |VM1: 56ms </br>VM2: 62ms|VM1: 6.357s </br>VM2:6.348s|
| n/2+1=5   | n/2+1=5  |VM1: 26ms </br>VM2: 38ms|VM1: 6.413s </br>VM2:6.353s|
|    n=8    | n=8      |VM1: 77ms </br>VM2: 93ms|VM1: 6.506s </br>VM2:6.477s|

因為pi.c的thread只有一個，所以CPU ready time都很小。			
### raytracing執行1000次的實驗數據
thread = 4
| VM1 | VM2 | Ready time | Execution time|
| --------  | -------- | -------- |-------|
| n/2=4     | n/2=4    |VM1: 186ms </br>VM2: 192ms|VM1: 4.80s </br>VM2:4.66s|
| n/2+1=5   | n/2+1=5  |VM1: 399ms </br>VM2: 282ms|VM1: 4.40s </br>VM2:4.27s|
|    n=8    | n=8      |VM1: 1921ms </br>VM2: 1024ms|VM1: 5.17s </br>VM2:4.44s|
thread = 5
| VM1 | VM2 | Ready time | Execution time|
| --------  | -------- | -------- |-------|
| n/2=4     | n/2=4    |VM1: 358ms </br>VM2: 214ms|VM1: 4.11s </br>VM2:4.07s|
| n/2+1=5   | n/2+1=5  |VM1: 3396ms </br>VM2: 737ms|VM1: 4.77s </br>VM2:4.18s|
|    n=8    | n=8      |VM1: 850ms </br>VM2: 2079ms|VM1: 3.99s </br>VM2:4.75s|
thread = 8
| VM1 | VM2 | Ready time | Execution time|
| --------  | -------- | -------- |-------|
| n/2=4     | n/2=4    |VM1: 103ms </br>VM2: 352ms|VM1: 3.78s </br>VM2:3.89s|
| n/2+1=5   | n/2+1=5  |VM1: 5056ms </br>VM2: 833ms|VM1: 4.19s </br>VM2:4.01s|
|    n=8    | n=8      |VM1: 4211ms </br>VM2: 2474ms|VM1: 4.21s </br>VM2:3.39s|
當n=n/2=4時，VM1及VM2被分配的CPU可能不衝突，因此ready time差距都不大。
當n=n/2+1=5時，可能就需要開始等待CPU。而當thread數超過4(見thread=5, 8表)，ready time 明顯產生。
當n=n=8時，也有發現顯著的ready time，且比n=n/2+1=5時還多。推測被分配的CPU更多也增加scheduling的複雜度了。

# Memory
1. 
## Memory Ballooning
當memory over-commit且實體memory滿了，這時候VM其實不知道滿了且要用到swap，
所以hypervisior會去透過Ballooning的方式把Vm的記憶體填滿，讓VM知道要去使用swap。
## TPS (transparent page sharing)
很多VM可能會去使用相同的page，例如:kernel，可能是一樣的，
於是就可以將很多VM的page共同指向同一份。
2. 
### 50%, 50%
![](https://i.imgur.com/db8y7GW.png)
![](https://i.imgur.com/afaSF2z.png)
### 60%, 60%
![](https://i.imgur.com/j8cht2K.png)
![](https://i.imgur.com/GozUGoU.png)
### 70%, 50%

| VM-1	  | VM-2	|    Memory consumed |	Balloon memory |
| --------| --------| --------           | --------        |
| n X 50% |	n X 50% |  4000104 KB        | 1832468 KB      |
| n X 60% |	n X 60% |  3980204 KB        | 1813920 KB      |
| n X 70% |	n X 50% |  4013736 KB	     | 2680656 KB	   |
可能是因為4GB記憶體不堪使用，所以在50%, 50%時也有Balloon發生
而記憶體不均時，balloon的情況會比較嚴重。
3. 
 ![](https://i.imgur.com/Wrnk9UZ.png)
在執行相同workload時有微幅上升，但礙於記憶體空間不足，所以share的程度很小。