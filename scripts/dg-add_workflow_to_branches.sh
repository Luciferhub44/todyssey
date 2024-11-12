#!/bin/bash                                                                07:11:25 [24/1781]
                                                                                              
 # Plik z listą ścieżek do repozytoriów                                                       
 REPOS_FILE="/home/dg-neural23/projects/trobdorepos.txt"                                      
                                                                                              
 # Katalog bazowy do przeszukiwania                                                           
 BASE_DIR="/home/dg-neural23/projects"                                                        
                                                                                              
 # Nazwa Twojego brancha                                                                      
 YOUR_BRANCH="feature/dg-neural"                                                              
                                                                                              
 # Sprawdź, czy plik z listą repozytoriów istnieje, jeśli nie, wygeneruj go                   
 if [ ! -f "$REPOS_FILE" ]; then                                                              
     echo "Plik z listą repozytoriów nie istnieje: $REPOS_FILE"                               
     echo "Generowanie pliku ..."                                                             
                                                                                              
     # Usuń istniejący plik wyjściowy                                                         
     rm -f "$REPOS_FILE"                                                                      
                                                                                              
     # Przeszukaj katalog bazowy                                                              
     find "$BASE_DIR" -type d -name .git | while read git_dir; do                             
         repo_dir=$(dirname "$git_dir")                                                       
         cd "$repo_dir" || continue                                                           
                                                                                              
         # Sprawdź, czy repozytorium zawiera gałęzie feature/* lub develop                    
         if git branch -r | grep -qE 'origin/feature/|origin/develop'; then                   
             echo "Dodawanie repozytorium: $repo_dir"                                         
             echo "$repo_dir" >> "$REPOS_FILE"                                                
         fi                                                                                   
     done                                                                                     
 fi                                                                                           
                                                                                              
 # Iteruj przez każde repozytorium                                                            
 while read repo; do                                                                          
     if [ -d "$repo" ]; then                                                                  
         echo "Przetwarzanie repozytorium: $repo"                                             
         cd "$repo" || continue                                                               
                                                                                              
         # Pobierz wszystkie gałęzie                                                          
         git fetch --all                                                                      
                                                                                              
         # Iteruj przez gałęzie feature/* i develop                                           
         for branch in origin/develop origin/feature/dg-neural origin/feature/lucifer444      
 origin/feature/malakser; do                                                                  
             branch_name=$(echo "$branch" | sed 's|origin/||')                                
             echo "Przełączanie na gałąź: $branch_name"                                       
             git checkout "$branch_name" || continue                                          
                                                                                              
             # Sprawdź, czy plik workflow.md istnieje                                         
             if [ ! -f .github/workflows/workflow.md ]; then                                  
                 echo "Dodawanie workflow.md do $branch_name"                                 
                 mkdir -p .github/workflows                                                   
                 cp ~/Documents/workflow.md .github/workflows/ || continue                    
                 git add .github/workflows/workflow.md                                        
                 git commit -m "Dodano workflow.md do $branch_name"                           
                 git push origin "$branch_name"                                               
             else                                                                             
                 echo "Plik workflow.md już istnieje na gałęzi $branch_name"                  
             fi                                                                               
         done                                                                                 
                                                                                              
         # Usuń wszystkie skrypty zaczynające się od dg- z wyjątkiem Twojego brancha          
         find . -type f -name 'dg-*.sh' ! -name "dg-$YOUR_BRANCH.sh" -exec rm -f {} \;        
                                                                                              
         cd - || continue                                                                  
     else                                                                                     
         echo "Repozytorium nie istnieje: $repo"                                              
     fi                                                                                       
 done < "$REPOS_FILE"                                                                         
                             