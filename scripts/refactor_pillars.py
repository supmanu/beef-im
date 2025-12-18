
import os

REPLACEMENT_MAP = {
    "Voice_DNA_Blueprint_v5_2_CORE.md": "voice-dna.md",
    "PILLAR_2_Brand_Constitution_v4_3_2_OPTIMIZED.md": "constitution.md",
    "PILLAR_3_Content_Engine_Master_Codes_v4_5_1_OPTIMIZED.md": "content-engine.md",
    "PILLAR_5_Visual_Engine_v3_0_MASTER.md": "visual-engine.md",
    "GSB_Kane_Enhanced_Deep_Dive_v4_5_5_OPTIMIZED.md": "framework-deep-dive.md",
    "GSB_Kane_Enhanced_Deep_Dive_v4_5_6_OPTIMIZED.md": "framework-deep-dive.md", 
    "ARCHITECTURE_3WAY_v5_2_1_BULLETPROOF.md": "tech-architecture-3way.md",
    "LAB_The_Bridge_v4_6_2_OPTIMIZED.md": "tech-bridge-lab.md",
    "ARCHIVE_Layout_Collision_v1_0_FIXED.md": "tech-archive-layout-fix.md",
    "NHES_VII_MASTER_REFERENCE_v1_0.md": "data-nhes-vii.md",
    "Terminology_Cheat_Sheet_v4_3_FINAL.md": "data-terminology.md",
    "Thai_First_Handshake_EXCEPTIONS_v4_3_1_OPTIMIZED.md": "data-thai-handshake-exceptions.md",
    "Quick_Citation_Template_v1_1_OPTIMIZED.md": "data-citation-template.md",
    "NotebookLM_Protocol_v4_5.md": "instruction-notebooklm-protocol.md",
    "GEM4_Sovereign_Auditor_Setup_v5_4_BULLETPROOF.md": "instruction-auditor-setup.md",
    "PERFORMER_INSTRUCTIONS_v5_5_SYSTEM_PROMPT.txt": "instruction-performer.txt",
    "GEMINI_CTO_v6_6_1_STRATEGIC_CONSULTANT.txt": "instruction-gemini-cto.txt",
    "SYSTEM_ARCHITECT_CTO_v6_6_1_SYSTEM_PROMPT.txt": "instruction-architect-cto.txt", 
    "CTO_PROJECT_CONFIG_GUIDE_v6_6_1_SOVEREIGN.md": "instruction-cto-config.md",
    "AI_Platform_Setup_Guide_v1_3.md": "instruction-platform-setup.md",
    "flagship_article_final.md": "data-flagship-article.md"
}

# Loose matching for variations often found in text
LOOSE_MAP = {
    "Voice_DNA_Blueprint": "voice-dna",
    "PILLAR_2_Brand_Constitution": "constitution",
    "PILLAR_3_Content_Engine": "content-engine", 
    "GSB_Kane_Enhanced_Deep_Dive": "framework-deep-dive",
    "Quick_Citation_Template": "data-citation-template",
    "Terminology_Cheat_Sheet": "data-terminology"
}

TARGET_DIR = r"c:\Users\supma\Projects\nerd-with-nart\nerd\pillars"

def process_files():
    print(f"Starting global refactor in {TARGET_DIR}")
    count = 0
    for filename in os.listdir(TARGET_DIR):
        file_path = os.path.join(TARGET_DIR, filename)
        
        if not os.path.isfile(file_path):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            
            # Exact filename replacement
            for old, new in REPLACEMENT_MAP.items():
                if old in new_content:
                    new_content = new_content.replace(old, new)
            
            # Loose variations (careful with these)
            # Only apply if user asked, but strictly speaking user asked for exact mapping.
            # However, looking at the user request "Voice_DNA_Blueprint... -> voice-dna.md", 
            # implies handling partials if they refer to the file.
            # For safety, I will stick to the provided table strict mapping first.
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated: {filename}")
                count += 1
                
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print(f"Refactor complete. Updated {count} files.")

if __name__ == "__main__":
    process_files()
