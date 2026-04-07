#include <stdio.h>
struct Process
{
    int pid, at, bt, ct, tat, wt, remaining;
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
        p[i].remaining = p[i].bt;
        p[i].ct = 0;
    }
    
    int time = 0, completed = 0;
    while (completed < n)
    {
        int idx = -1;
        int min_remaining = 9999;
        
        // Find process with shortest remaining time that has arrived
        for (int i = 0; i < n; i++)
        {
            if (p[i].at <= time && p[i].remaining > 0 && p[i].remaining < min_remaining)
            {
                min_remaining = p[i].remaining;
                idx = i;
            }
        }
        
        if (idx != -1)
        {
            p[idx].remaining--;
            time++;
            
            // If process completed
            if (p[idx].remaining == 0)
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
        printf("%d\t%d\t%d\t%d\t%d\t%d\n", p[i].pid, p[i].at, p[i].bt, p[i].ct, p[i].tat,
               p[i].wt);
    }
    return 0;
}