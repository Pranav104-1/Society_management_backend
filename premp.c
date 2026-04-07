#include <stdio.h>
struct Process
{
    int pid, at, bt, rt, ct, tat, wt;
};

int main()
{
    int n;
    printf("Enter number of processes: ");
    scanf("%d", &n);

    struct Process p[n];
    for (int i = 0; i < n; i++)
    {
        p[i].pid = i + 1;
        printf("Enter Arrival Time and Burst Time for P%d: ", i + 1);
        scanf("%d %d", &p[i].at, &p[i].bt);
        p[i].rt = p[i].bt;
    }

    int time = 0, completed = 0;
    while (completed < n)
    {
        int idx = -1;
        int min_rt = 9999;
        for (int i = 0; i < n; i++)
        {
            if (p[i].at <= time && p[i].rt > 0 && p[i].rt < min_rt)
            {
                min_rt = p[i].rt;
                idx = i;
            }
        }
        if (idx != -1)
        {
            p[idx].rt--;
            time++;
            if (p[idx].rt == 0)
            {
                p[idx].ct = time;
                p[idx].tat = p[idx].ct - p[idx].at;
                p[idx].wt = p[idx].tat - p[idx].bt;
                completed++;
            }
        }
        else
        {
            time++;
        }
    }
    printf("\nPID\tAT\tBT\tCT\tTAT\tWT\n");
    for (int i = 0; i < n; i++)
    {
        printf("%d\t%d\t%d\t%d\t%d\t%d\n", p[i].pid, p[i].at, p[i].bt, p[i].ct, p[i].tat, p[i].wt);
    }
    return 0;
}