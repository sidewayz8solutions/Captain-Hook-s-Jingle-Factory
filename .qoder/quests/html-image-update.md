# HTML Image Path Update Design

## Overview

This design document outlines the specific image path updates required for Captain Hook's Jingle Factory website. The task involves updating two types of image references in the HTML file without modifying any other aspects of the code.

## Current State Analysis

### Current Image Paths
The HTML file currently contains the following image references:

1. **Hook Images (18 instances)**:
   - Current path: `file:///Users/sidewayz8/Desktop/Captn/public/hook.png`
   - Used in floating hooks (11 instances) and hanging hooks (7 instances)

2. **Captain Image (1 instance)**:
   - Current path: `file:///Users/sidewayz8/Desktop/Captn/public/chook.png`
   - Used in hero section

### Target Image Paths
The required updates are:

1. **Hook Images**: 
   - New path: `Users/sidewayz8/Desktop/Captn/public/hook.png`
   - Change: Remove `file:///` protocol prefix

2. **Captain Image**:
   - New path: `Users/sidewayz8/Captn/public/chook.png`
   - Change: Remove `file:///` protocol prefix and remove "Desktop/" from path

## Image Reference Locations

### Hook Image References (18 total)

#### Floating Hooks Section (11 instances)
Located in the hero section around line 999-1009:
- `floating-hook-1` through `floating-hook-11`
- All currently using: `file:///Users/sidewayz8/Desktop/Captn/public/hook.png`

#### Hanging Hooks Section (7 instances)  
Located in the hanging hooks container around line 1405-1429:
- `hanging-hook-top-1` through `hanging-hook-top-7`
- All currently using: `file:///Users/sidewayz8/Desktop/Captn/public/hook.png`

### Captain Image Reference (1 instance)
Located in the hero section around line 1015:
- Class: `captain-image enhanced-captain-glow`
- Currently using: `file:///Users/sidewayz8/Desktop/Captn/public/chook.png`

## Implementation Strategy

### Path Update Rules

1. **Hook Images Update**:
   ```
   FROM: file:///Users/sidewayz8/Desktop/Captn/public/hook.png
   TO:   Users/sidewayz8/Desktop/Captn/public/hook.png
   ```

2. **Captain Image Update**:
   ```
   FROM: file:///Users/sidewayz8/Desktop/Captn/public/chook.png
   TO:   Users/sidewayz8/Captn/public/chook.png
   ```

### Precision Requirements

- **Zero Tolerance for Additional Changes**: Only the specified image paths must be modified
- **Exact Path Matching**: Each path replacement must be precise
- **Preserve All Attributes**: Maintain all HTML attributes, classes, and structure
- **Maintain Formatting**: Preserve existing indentation and spacing

## Validation Criteria

### Success Metrics

1. **Hook Images (18 updates)**:
   - All hook image sources updated to remove `file:///` prefix
   - Path remains: `Users/sidewayz8/Desktop/Captn/public/hook.png`

2. **Captain Image (1 update)**:
   - Captain image source updated to remove `file:///` prefix
   - Path becomes: `Users/sidewayz8/Captn/public/chook.png`

3. **No Collateral Changes**:
   - CSS styles remain unchanged
   - HTML structure preserved
   - JavaScript functionality intact
   - All other image attributes maintained

### Quality Assurance

- Verify all 19 image references are updated correctly
- Confirm no other code modifications occurred
- Validate HTML structure integrity
- Ensure consistent path formatting across all updates